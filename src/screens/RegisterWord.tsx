import { Loading } from "@components/Loading";
import { Word } from "@core/domain/entities/Word";
import { useAuth } from "@core/hooks/Auth";
import { FireStoreWord } from "@core/services/FireStoreWord";
import { Suggestions } from "@core/services/Suggestions";
import { Box, Button, HStack, Input, Text, VStack } from "native-base";
import { useState } from "react";

export function RegisterWord() {
  const { user } = useAuth()
  const [word, setWord] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [optionSelected, setOptionSelected] = useState<number | null>();
  const [customAnswer, setCustomAnswer] = useState<string | null>();
  const [options, setOptions] = useState<{ right: string[], wrong: string[] }>({ right: [], wrong: [] })

  const onChange = (e: string) => {
    setWord(e);

    if (e.length >= 7) {
      handleSearch(e);
    }
  }

  const onChangeCustomerAnswer = (e: string) => {

    setOptionSelected(null)
    setCustomAnswer(e);
  }

  const handleSearch = async (value: string) => {
    setIsLoading(true);

    const suggestions = new Suggestions();
    const { right, wrong } = await suggestions.getWord({
      fromLanguage: 'Portuguese',
      targetLanguage: 'English',
      word: value,
    });

    setOptions({
      right, wrong
    });
    setIsLoading(false);
  }

  const handleCancel = async () => {
    console.log('handleCancel');
  }

  const handleNewWord = async () => {
    console.log('handleNewWord');
    let finalCustomAnswer: string;

    if (customAnswer !== "" && customAnswer !== undefined) {
      finalCustomAnswer = customAnswer;
    } else {
      finalCustomAnswer = options.right[optionSelected];
    }

    console.log('options.right[optionSelected]', options.right[optionSelected])
    console.log('customAnswer', customAnswer)
    console.log('options', options)
    console.log('optionSelected', optionSelected)

    const finalOptions = options.right.reduce((acc, curr) => {
      acc[curr.toLocaleLowerCase()] = curr;
      return acc;
    }, {});

    if (!!user && word) {
      const service = new FireStoreWord(user);
      const wordCreated = new Word({
        originalLanguage: "Portuguese",
        targetLanguage: "English",
        originalWord: word,
        targetWord: finalCustomAnswer,
        options: finalOptions,
        customAnswer: customAnswer || '',
        userRef: user.getUID(),
      });

      await service.create({
        document: wordCreated,
      });
    }
  }

  return (
    <VStack flexDir={"column"} display="flex" justifyContent={"space-between"} flex={1} px={10} pt={10}>
      <HStack mb={5}>
        <Input variant="outline" padding={5} type="text" size="2xl" onChangeText={onChange} placeholder="Word" w="100%" />
      </HStack>

      {
        isLoading ? <Loading /> : (
          <HStack display={"flex"} flexDir="column" flex={1}>
            {
              options.right.length > 0 && (
                <>
                  <Text>The translation is one of them?</Text>
                  <Box display={"flex"} flexDir="row" flexWrap={"wrap"} justifyContent="space-between">
                    {
                      options.right.map((option, key) => (
                        <Button onPress={() => {
                          setOptionSelected(key);
                        }
                        } mr={1} mb={1} key={key} minW={120} flex={1} padding={10} variant={optionSelected === key ? "solid" : "outline"} textAlign={"center"}>
                          <Text>{option}</Text>
                        </Button>
                      ))
                    }

                    <Input mt={5} padding={3} flexGrow={1} variant="outline" type="text" size="xl" onChangeText={onChangeCustomerAnswer} placeholder="If not, write your translation here" w="100%" />
                  </Box>
                </>
              )
            }
          </HStack>
        )
      }

      <HStack display={"flex"} flexDir={"row"} justifyContent="center" pt={5}>
        <Button onPress={handleCancel} rounded={"3xl"} padding={8} variant="solid" colorScheme={"secondary"} textAlign={"center"}>
          <Text>Cancel</Text>
        </Button>
        <Button disabled={!optionSelected} onPress={handleNewWord} rounded={"3xl"} padding={8} variant="solid" colorScheme={"primary"} textAlign={"center"}>
          <Text>Save</Text>
        </Button>
      </HStack>
    </VStack >
  );
}

