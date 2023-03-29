import { Box, HStack, ScrollView, Text, VStack } from "native-base";

export function GameSelect() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <Box display="flex" flexDir={"row"} flex={1} flexWrap={"wrap"} px={10} pt={10}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
            <Box minH={100} key={key} flex={1} flexBasis={"50%"} justifyContent={"center"} background={"amber.100"} textAlign={"center"}>
              <Text textAlign={"center"}>Option {key}</Text>
            </Box>
          ))
        }
      </Box>
    </ScrollView>
  );
}

