import { Box, Button, HStack, ScrollView, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function Games() {
  const navigation = useNavigation();

  const handleGame = (number: number) => {
    switch (number) {
      case 1:
        navigation.navigate('gameSelect');
        break
      case 2:
        navigation.navigate('gameTranslate');
        break
      case 3:
        navigation.navigate('gameOption');
        break
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flexDir={"column"} display="flex" justifyContent={"space-between"} flex={1} px={10} pt={10}>
        {
          [1, 2, 3].map((key) => (
            <Button onPress={() => handleGame(key)} key={key} minW={120} flex={1} padding={5} mt={1} variant="outline" justifyContent="center">
              <Text textAlign={"center"}>Game {key}</Text>
            </Button>
          ))
        }
      </VStack>
    </ScrollView>
  );
}

