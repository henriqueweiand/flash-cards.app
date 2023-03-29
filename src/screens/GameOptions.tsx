import { Button, HStack, ScrollView, Text, VStack } from "native-base";

export function GameOption() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flexDir={"column"} display="flex" justifyContent={"space-between"} flex={1} px={10} pt={10}>

        <HStack display={"flex"} flexDir="column" flex={1} justifyContent="center">
          <Text textAlign={"center"}>Word</Text>
        </HStack>

        <HStack display={"flex"} flexDir={"column"} pt={5}>
          {
            [1, 2, 3, 4].map((key) => (
              <Button key={key} minW={120} flex={1} padding={5} mt={1} variant="outline" textAlign={"center"}>
                <Text>Option {key}</Text>
              </Button>
            ))
          }
        </HStack>
      </VStack>
    </ScrollView>
  );
}

