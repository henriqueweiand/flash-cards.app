import { useAuth } from "@core/hooks/Auth";
import { Suggestions } from "@core/services/Suggestions";
import { Box, Button, HStack, Input, Text, VStack } from "native-base";

export function RegisterWord() {
  const { user } = useAuth()

  const onChange = (e) => console.log(e);

  const handleCancel = async () => {
    const suggestions = new Suggestions();
    const teste = await suggestions.getWord({
      fromLanguage: 'Portuguese',
      targetLanguage: 'English',
      word: 'dirigir',
    });

    console.log(teste)
  }

  const handleNewWord = async () => {
    const suggestions = new Suggestions();
    // const definition = await translations.suggestionsDefinition();
    // console.log(definition);

    // if (!!user) {
    //   const service = new FireStoreWord(user);
    //   const word = new Word({
    //     originalLanguage: "English2",
    //     targetLanguage: "French2",
    //     originalWord: "hello",
    //     targetWord: "bonjour",
    //     options: { "A": "hola", "B": "bonjour", "C": "hallo", "D": "ciao" },
    //     customAnswer: "",
    //     authorName: "",
    //     userRef: user.getUID(),
    //   });

    //   await service.create({
    //     document: word,
    //   });
    // }
  }

  return (
    <VStack flexDir={"column"} display="flex" justifyContent={"space-between"} flex={1} px={10} pt={10}>
      <HStack mb={5}>
        <Input variant="outline" padding={5} type="text" size="2xl" onChangeText={onChange} placeholder="Word" w="100%" />
      </HStack>

      <HStack display={"flex"} flexDir="column" flex={1}>
        <Text>The translation is one of them?</Text>
        <Box display={"flex"} flexDir="row" flexWrap={"wrap"} justifyContent="space-between">
          {
            [1, 2, 3, 4].map((key) => (
              <Button mr={1} mb={1} key={key} minW={120} flex={1} padding={10} variant="outline" textAlign={"center"}>
                <Text>Option {key}</Text>
              </Button>
            ))
          }
          <Input mt={5} padding={3} flexGrow={1} variant="outline" type="text" size="xl" onChangeText={onChange} placeholder="If not, write your translation here" w="100%" />
        </Box>
      </HStack>

      <HStack display={"flex"} flexDir={"row"} justifyContent="center" pt={5}>
        <Button onPress={handleCancel} rounded={"3xl"} padding={8} variant="solid" colorScheme={"secondary"} textAlign={"center"}>
          <Text>Cancel</Text>
        </Button>
        <Button onPress={handleNewWord} rounded={"3xl"} padding={8} variant="solid" colorScheme={"primary"} textAlign={"center"}>
          <Text>Save</Text>
        </Button>
      </HStack>
    </VStack >
  );
}

