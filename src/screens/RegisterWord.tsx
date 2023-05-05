import { Loading } from "@components/Loading";
import { Word } from "@core/domain/entities/Word";
import { useAuth } from "@core/hooks/Auth";
import { FireStoreWord } from "@core/services/FireStoreWord";
import { Suggestions } from "@core/services/Suggestions";
import { Box, Button, HStack, Input, Text, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";
import { debounce } from 'lodash';
import { ToastAlert } from "@components/ToastAlert";
import { useNavigation } from "@react-navigation/native";
import { SafeArea } from "@components/SafeArea";
import { useLanguage } from "@core/hooks/Language";

export function RegisterWord() {
  const { language } = useLanguage();
  const { user } = useAuth()
  const navigation = useNavigation();
  const toast = useToast();

  const [word, setWord] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [optionSelected, setOptionSelected] = useState<number | null>();
  const [customAnswer, setCustomAnswer] = useState<string | undefined>('');
  const [options, setOptions] = useState<{ right: string[], wrong: string[] }>({ right: [], wrong: [] })

  const handleInput = (text: string) => setWord(text);

  useEffect(() => {
    if (word.length >= 3) {
      const debounceSearch = debounce(handleSearch, 1000);
      debounceSearch(word);
      return () => debounceSearch.cancel(); // cancel debounce on unmount
    }
  }, [word, handleSearch]);

  const onChangeCustomerAnswer = (value: string) => {
    setOptionSelected(null)
    setCustomAnswer(value);
  }

  const handleSearch = async (value: string) => {
    const currentLanguage = language?.toObject();

    if (!!currentLanguage) {
      setIsLoading(true);

      const suggestions = new Suggestions();
      const { right, wrong } = await suggestions.getWord({
        fromLanguage: currentLanguage?.from.language,
        targetLanguage: currentLanguage?.to.language,
        word: value,
      });

      setOptions({
        right, wrong
      });
      setIsLoading(false);
    } else {
      toast.show({
        render: () => {
          return <ToastAlert title="Error" description="Your language was not defined" />;
        }
      });
    }
  }

  const handleCancel = async () => {
    navigation.goBack()
  }

  const handleClear = async () => {
    setWord('');
    setOptionSelected(null);
    setCustomAnswer(undefined);
    setOptions({ right: [], wrong: [] });
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

    const currentLanguage = language?.toObject();
    const targetWord = handleFinalAnswer();

    if (!!user && word && targetWord && !!currentLanguage) {
      const service = new FireStoreWord(user);
      const wordCreated = new Word({
        originalLanguage: currentLanguage.from.language,
        targetLanguage: currentLanguage.to.language,
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
      handleClear();
    } else {
      toast.show({
        render: () => {
          return <ToastAlert title="Error" description="please review pre requirement fields" />;
        }
      });
    }
  }

  return (
    <SafeArea>
      <VStack flexDir={"column"} display="flex" justifyContent={"space-between"} flex={1} px={10} pt={10}>
        <HStack mb={5}>
          <Input value={word} variant="outline" padding={5} type="text" size="2xl" onChangeText={handleInput} placeholder="Word" w="100%" />
        </HStack>

        {
          isLoading ? <Loading /> : (
            <HStack display={"flex"} flexDir="column" flex={1}>
              {
                (options.right.length == 1 || options.right[0] == 'No translation found') ? (
                  <Text>No translation found</Text>
                ) : (
                  <>
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
                  </>
                )
              }
            </HStack>
          )
        }

        <HStack display={"flex"} flexDir={"row"} justifyContent="center" pt={5}>
          <Button onPress={handleCancel} size={'lg'} variant="solid" colorScheme='coolGray'>
            Leave
          </Button>

          <Button onPress={handleClear} size={'lg'} ml={5} mr={5} variant="solid" colorScheme='teal'>
            Clear
          </Button>

          <Button onPress={handleNewWord} size={'lg'} pl={10} pr={10} colorScheme='green' variant={
            !!handleFinalAnswer() ? `solid` : `ghost`
          }>
            Save
          </Button>
        </HStack>
      </VStack>
    </SafeArea>
  );
}

