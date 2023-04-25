import { createContext, ReactNode, useEffect, useState } from 'react';

import { Word } from '@core/domain/entities/Word';
import { useAuth } from '@core/hooks/Auth';
import { FireStoreWord } from '@core/services/FireStoreWord';
import { Button, Progress, ScrollView, Text, VStack } from 'native-base';
import { Loading } from '@components/Loading';
import _ from 'lodash';

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

  const getGames = async ({ gamesQuantity }: { gamesQuantity: number }) => {
    if (user) {
      const fireStoreWord = new FireStoreWord(user);

      const words = await fireStoreWord.findAll(); // it needs to receive the param gamesQuantity
      setGames(words);

      const index = Math.floor(Math.random() * words.length);
      setGame(words[index]);
      setLoading(false);
    }
  }

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
    if (gamesQuantity) {
      getGames({ gamesQuantity })
    } else {
      throw new Error('GameContext: Inform gamesQuantity');
    }
  }, [reset]);

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
            <VStack display={"flex"} flexDir={'row'}>
              <Button onPress={() => {
                touchReset();
              }}>
                <Text>X</Text>
              </Button>
              <Progress flex={1} value={progress} mx="4" />
            </VStack>

            {
              finish ? <>
                <Text>
                  Congratulations
                </Text>
                <Button onPress={() => {
                  touchReset();
                }}>
                  <Text>X</Text>
                </Button>
              </> : children
            }
          </ScrollView>
        )
      }
    </GameContext.Provider>
  )
}
