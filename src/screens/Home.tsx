import { useNavigation } from "@react-navigation/native";
import { Button, Center, ScrollView, Text } from "native-base";

export function Home() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <Center flex={1}>
        <Button onPress={() => navigation.navigate('registerWord')} minW={120} padding={5} mt={1} variant="outline" justifyContent="center">
          <Text textAlign={"center"}>Register word</Text>
        </Button>

        <Button onPress={() => navigation.navigate('gameOption')} minW={120} padding={5} mt={1} variant="outline" justifyContent="center">
          <Text textAlign={"center"}>Play</Text>
        </Button>
      </Center>
    </ScrollView>
  );
}

