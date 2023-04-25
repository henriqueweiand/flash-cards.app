import { useGame } from "@core/hooks/Game";
import { Button, HStack, ScrollView, Text, VStack } from "native-base";
import { useEffect, useState } from "react";

export function GameOption() {
  const { game, next } = useGame();
  const [options, setOptions] = useState([]);
  const [optionSelected, setOptionSelected] = useState<string | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<'wrong' | 'right' | null>(null);

  useEffect(() => {
    if (game)
      setOptions(game.getOptionsWithMax(4));
  }, [game])

  const checkAnswer = () => {
    const rightAnswer = game?.getTargetWord().toLocaleLowerCase();
    const userAnswer = optionSelected?.toLocaleLowerCase();

    if (userAnswer == rightAnswer) {
      setAnswerFeedback('right');
    } else {
      setAnswerFeedback('wrong');
    }
  }

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

            <HStack display={"flex"} flexDir={"column"} justifyContent="center" pt={5}>
              {
                answerFeedback !== null ? (
                  <Button onPress={() => {
                    setOptionSelected(null);
                    setAnswerFeedback(null);
                    next({ rightAnswer: answerFeedback === 'right' });
                  }} rounded={"3xl"} padding={8} variant='solid' colorScheme={answerFeedback === 'right' ? 'green' : 'red'} textAlign={"center"}>
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

          </>
        )
      }
    </>
  );
}

