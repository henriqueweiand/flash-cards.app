import { createContext, ReactNode, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Word } from '@core/domain/entities/Word';
import { useAuth } from '@core/hooks/Auth';
import { FireStoreWord } from '@core/services/FireStoreWord';
import { Button, Icon, Progress, ScrollView, Text, VStack } from 'native-base';
import { Loading } from '@components/Loading';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '@core/hooks/Language';

export interface GameContextType {
  finish: boolean;
  loading: boolean;
  progress: number;
  game: Word | null;
  next: ({ rightAnswer }: { rightAnswer: boolean }) => void;
}

interface GameProviderProps {
  children: ReactNode;
  gamesQuantity: number;
}

export const GameContext = createContext({} as GameContextType)

export function GameProvider({ children, gamesQuantity }: GameProviderProps) {
  const { language } = useLanguage();
  const navigation = useNavigation();
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(true);
  const [finish, setFinish] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  const [progress, setProgress] = useState<number>(0);
  const [played, setPlayed] = useState<Word[]>([]);
  const [games, setGames] = useState<Word[]>([]);
  const [game, setGame] = useState<Word | null>(null);

  const next = ({ rightAnswer }: { rightAnswer: boolean }) => {
    let restGames: Word[];

    if (rightAnswer) {
      if (games.length === 1) {
        setFinish(true);
      }

      const gamesPlayed = [...played, game as Word];
      restGames = games.filter(cgame => cgame.getDocRef() !== game?.getDocRef());
      const progress = (gamesPlayed.length / (restGames.length + gamesPlayed.length)) * 100;

      setPlayed(gamesPlayed);
      setGames(restGames);
      setProgress(progress);
    } else {
      restGames = games;
    }

    const nextGame = _.shuffle(restGames);

    setGame(nextGame[0]);
  }

  const getGames = async ({ gamesQuantity, languageFrom, languageTo }: { gamesQuantity: number, languageFrom: string, languageTo: string }) => {
    if (user) {
      const fireStoreWord = new FireStoreWord(user);

      const words = await fireStoreWord.findAll({ gamesQuantity, languageFrom, languageTo });
      setGames(words);

      const index = Math.floor(Math.random() * words.length);
      setGame(words[index]);
      setLoading(false);
    }
  }

  const handleExit = () => {
    touchReset();
    navigation.goBack();
  };

  const touchReset = () => {
    setReset(!reset);
    setLoading(true);
    setFinish(false);
    setProgress(0);
    setPlayed([]);
    setGames([]);
    setGame(null);
  };

  useEffect(() => {
    if (gamesQuantity && !!language) {
      const currentLanguage = language.toObject();
      getGames({ gamesQuantity, languageFrom: currentLanguage.from.language, languageTo: currentLanguage.to.language })
    } else {
      throw new Error('GameContext: Inform gamesQuantity');
    }
  }, [reset, language]);

  return (
    <GameContext.Provider
      value={{
        finish,
        loading,
        progress,
        game,
        next,
      }}
    >
      {
        loading ? <Loading /> : (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack alignItems={'center'} display={"flex"} flexDir={'row'}>
              <Button
                variant={'ghost'}
                onPress={() => handleExit()}
              >
                <Icon size="6" as={Ionicons} name="close-outline" />
              </Button>
              <Progress flex={1} value={progress} mr="5" />
            </VStack>

            {
              finish ? <VStack flex={1} alignItems={'center'} justifyContent={'center'} display={"flex"} flexDir={'column'}>
                <Text fontSize="5xl" bold textAlign={"center"} mb={5}>
                  Congratulations
                </Text>
                <Button onPress={() => {
                  handleExit();
                }}>
                  Close
                </Button>
              </VStack> : children
            }
          </ScrollView>
        )
      }
    </GameContext.Provider>
  )
}
