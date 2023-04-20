import { Word } from "@core/domain/entities/Word";
import { useAuth } from "@core/hooks/Auth";
import { FireStoreWord } from "@core/services/FireStoreWord";
import { Box, Button, HStack, ScrollView, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Progress } from 'native-base';

export function GameOption() {
  const { user } = useAuth()

  const [playedGames, setPlayedGames] = useState<Word[]>([]);
  const [games, setGames] = useState<Word[]>([]);
  const [game, setGame] = useState<Word>();

  const [optionSelected, setOptionSelected] = useState<string | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<'wrong' | 'right' | null>(null);

  const calcPorcentage = () => {
    const totalPlayed = playedGames.length;

    return (totalPlayed / (games.length + totalPlayed)) * 100;
  }

  const getNextGame = () => {
    const index = Math.floor(Math.random() * games.length);

    return games[index];
  }

  const init = async () => {
    if (user) {
      const fireStoreWord = new FireStoreWord(user);

      const words = await fireStoreWord.findAll();

      setGames(words);

      const index = Math.floor(Math.random() * words.length);

      setGame(words[index]);
    }
  }

  const checkAnswer = () => {
    const rightAnswer = game?.getTargetWord().toLocaleLowerCase();
    const userAnswer = optionSelected?.toLocaleLowerCase();

    if (userAnswer == rightAnswer) {
      setAnswerFeedback('right');

      setPlayedGames([...playedGames, game])
      setGames(games.filter(cgame => cgame.getDocRef() !== game?.getDocRef()))
    } else {
      setAnswerFeedback('wrong');
    }
  }

  const next = () => {
    const nextGame = getNextGame();

    setGame(nextGame);
    setOptionSelected(null);
    setAnswerFeedback(null);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <Progress value={calcPorcentage()} mx="4" />

      {
        !!game && (
          <VStack flexDir={"column"} display="flex" justifyContent={"space-between"} flex={1} px={10} pt={10}>

            <HStack display={"flex"} flexDir="column" flex={1} justifyContent="center">
              <Text textAlign={"center"}>{game.getOriginalWord()}</Text>
            </HStack>

            <HStack display={"flex"} flexDir={"column"} pt={5}>
              {
                game.getOptionsWithMax(4).map((value, key) => (
                  <Button onPress={() => {
                    setOptionSelected(value);
                  }} key={key} minW={120} flex={1} padding={5} mt={1} variant={optionSelected === value ? "solid" : "outline"} textAlign={"center"}>
                    <Text>{value}</Text>
                  </Button>
                ))
              }
            </HStack>
          </VStack>
        )}

      <HStack display={"flex"} flexDir={"column"} justifyContent="center" pt={5}>
        {
          answerFeedback !== null ? (
            <Button onPress={next} rounded={"3xl"} padding={8} variant='solid' colorScheme={answerFeedback === 'right' ? 'green' : 'red'} textAlign={"center"}>
              <Text>Next</Text>
            </Button>
          ) : (
            <>
              {
                (optionSelected !== null) && (
                  <Button onPress={checkAnswer} rounded={"3xl"} padding={8} variant='solid' colorScheme={"primary"} textAlign={"center"}>
                    <Text>Check</Text>
                  </Button>
                )
              }
            </>
          )
        }
      </HStack>
    </ScrollView>
  );
}

