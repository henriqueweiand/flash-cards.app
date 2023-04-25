import { GameBottomConfirmations } from "@components/GameBottomConfirmations";
import { useGame } from "@core/hooks/Game";
import { Button, HStack, Text, VStack } from "native-base";
import { useEffect, useState } from "react";

export function GameOption() {
  const { game } = useGame();
  const [options, setOptions] = useState([]);
  const [optionSelected, setOptionSelected] = useState<string | null>(null);

  useEffect(() => {
    if (game)
      setOptions(game.getOptionsWithMax(4));
  }, [game])

  const rightAnswer = game?.getTargetWord().toLocaleLowerCase();
  const userAnswer = optionSelected?.toLocaleLowerCase();

  return (
    <>
      {
        game && (
          <>
            <VStack flexDir={"column"} display="flex" justifyContent={"space-between"} flex={1} px={10} pt={10}>

              <HStack display={"flex"} flexDir="column" flex={1} justifyContent="center">
                <Text textAlign={"center"}>{game.getOriginalWord()}</Text>
              </HStack>

              <HStack display={"flex"} flexDir={"column"} pt={5}>
                {
                  options.map((value, key) => (
                    <Button onPress={() => {
                      setOptionSelected(value);
                    }} key={key} minW={120} flex={1} padding={5} mt={1} variant={optionSelected === value ? "solid" : "outline"} textAlign={"center"}>
                      <Text>{value}</Text>
                    </Button>
                  ))
                }
              </HStack>
            </VStack>

            <GameBottomConfirmations enableCheck={!!optionSelected} answerIsRight={userAnswer == rightAnswer} nextGameCallback={() => {
              setOptionSelected(null);
            }} />
          </>
        )
      }
    </>
  );
}

