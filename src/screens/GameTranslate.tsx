import { Box, Button, FormControl, HStack, Input, ScrollView, Text, VStack } from "native-base";

export function GameTranslate() {
  const onChange = (e) => console.log(e);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flexDir={"column"} display="flex" justifyContent={"space-between"} flex={1} px={10} pt={10}>

        <HStack display={"flex"} flexDir="column" flex={1} justifyContent="center">
          <Text textAlign={"center"}>Word</Text>
        </HStack>

        <HStack display={"flex"} flexDir={"column"} pt={5}>
          <FormControl>
            <FormControl.Label>word</FormControl.Label>
            <Input type="text" onChangeText={onChange} />
          </FormControl>
          <Button onPress={() => console.log("hello world")}>Send</Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
}

