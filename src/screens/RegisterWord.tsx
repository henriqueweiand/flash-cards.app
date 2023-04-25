import { Loading } from "@components/Loading";
import { Word } from "@core/domain/entities/Word";
import { useAuth } from "@core/hooks/Auth";
import { FireStoreWord } from "@core/services/FireStoreWord";
import { Suggestions } from "@core/services/Suggestions";
import { Box, Button, HStack, Input, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { debounce } from 'lodash';
import { ToastAlert } from "@components/ToastAlert";

export function RegisterWord() {
  const { user, logoff } = useAuth()
  const toast = useToast();

  const [word, setWord] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [optionSelected, setOptionSelected] = useState<number | null>();
  const [customAnswer, setCustomAnswer] = useState<string | undefined>('');
  const [options, setOptions] = useState<{ right: string[], wrong: string[] }>({ right: [], wrong: [] })

  const handleInput = debounce((value: string) => {
    setWord(value);

    if (value.length >= 3) {
      handleSearch(value);
    }
  }, 1000);

  const onChangeCustomerAnswer = (value: string) => {
    setOptionSelected(null)
    setCustomAnswer(value);
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

    logoff();
  }

  const handleFinalAnswer = () => {
    if (customAnswer !== "" && customAnswer !== undefined) {
      return customAnswer;
    } else if (optionSelected || optionSelected === 0) {
      return options.right[optionSelected];
    } else {
      return false;
    }
  }

  const handleNewWord = async () => {
    const finalRightOptions = options.right.reduce((acc, curr) => {
      acc[curr.toLocaleLowerCase()] = curr;
      return acc;
    }, {});

    const finalWrongOptions = options.wrong.reduce((acc, curr) => {
      acc[curr.toLocaleLowerCase()] = curr;
      return acc;
    }, {});

    const targetWord = handleFinalAnswer();

    if (!!user && word && targetWord) {
      const service = new FireStoreWord(user);
      const wordCreated = new Word({
        originalLanguage: "Portuguese",
        targetLanguage: "English",
        originalWord: word,
        targetWord,
        rightOptions: finalRightOptions,
        wrongOptions: finalWrongOptions,
        customAnswer: customAnswer || '',
        userRef: user.getUID(),
      });

      await service.create({
        document: wordCreated,
      });
    } else {
      toast.show({
        render: () => {
          return <ToastAlert title="Error" description="please review pre requirement fields" />;
        }
      });
    }
  }

  return (
    <VStack flexDir={"column"} display="flex" justifyContent={"space-between"} flex={1} px={10} pt={10}>
      <HStack mb={5}>
        <Input variant="outline" padding={5} type="text" size="2xl" onChangeText={handleInput} placeholder="Word" w="100%" />
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
                          setCustomAnswer('');
                        }
                        } mr={1} mb={1} key={key} minW={120} flex={1} padding={10} variant={optionSelected === key ? "solid" : "outline"} textAlign={"center"}>
                          <Text>{option}</Text>
                        </Button>
                      ))
                    }

                    <Input mt={5} padding={3} flexGrow={1} variant="outline" type="text" size="xl" value={customAnswer} onChangeText={onChangeCustomerAnswer} placeholder="If not, write your translation here" w="100%" />
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
        <Button onPress={handleNewWord} rounded={"3xl"} padding={8} variant={
          !!handleFinalAnswer() ? `solid` : `ghost`
        } colorScheme={"primary"} textAlign={"center"}>
          <Text>Save</Text>
        </Button>
      </HStack>
    </VStack >
  );
}

