import { Word } from "@core/domain/entities/Word";
import { useAuth } from "@core/hooks/Auth";
import { FireStoreWord } from "@core/services/FireStoreWord";
import { Box, Button, HStack, ScrollView, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Progress } from 'native-base';

export function GameOption() {
  const { user } = useAuth()
  const [optionSelected, setOptionSelected] = useState<number | null>();
  const [games, setGames] = useState<Word[]>([]);
  const [count, setCount] = useState<number>(0);
  const [game, setGame] = useState<Word>();

  const calcPorcentage = () => {
    return (count / games.length) * 100;
  }

  const init = async () => {
    if (user) {
      const fireStoreWord = new FireStoreWord(user);

      const words = await fireStoreWord.findAll();

      setGames(words);
      setGame(words[count]);
    }
  }

  const next = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    setGame(games[nextCount]);
  }

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    console.log(game)
  }, [game])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      {
        games.length > 0 && <Progress value={calcPorcentage()} mx="4" />
      }

      {
        !!game && (
          <VStack flexDir={"column"} display="flex" justifyContent={"space-between"} flex={1} px={10} pt={10}>

            <HStack display={"flex"} flexDir="column" flex={1} justifyContent="center">
              <Text textAlign={"center"}>{game.getOriginalWord()}</Text>
            </HStack>

            <HStack display={"flex"} flexDir={"column"} pt={5}>
              {
                game.getOptions().map((value, key) => (
                  <Button onPress={() => {
                    setOptionSelected(key);
                  }} key={key} minW={120} flex={1} padding={5} mt={1} variant={optionSelected === key ? "solid" : "outline"} textAlign={"center"}>
                    <Text>{value}</Text>
                  </Button>
                ))
              }
            </HStack>
          </VStack>
        )}

      <HStack display={"flex"} flexDir={"row"} justifyContent="center" pt={5}>
        <Button onPress={next} rounded={"3xl"} padding={8} variant='solid' colorScheme={"primary"} textAlign={"center"}>
          <Text>Check</Text>
        </Button>
      </HStack>
    </ScrollView>
  );
}

