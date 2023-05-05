import { Loading } from "@components/Loading";
import { useLanguage } from "@core/hooks/Language";
import { useNavigation } from "@react-navigation/native";
import { Button, Center, ScrollView, Text } from "native-base";

export function Home() {
  const navigation = useNavigation();
  const { language, loading } = useLanguage();

  if (loading)
    return <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}><Loading /></ScrollView>

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {
        language == undefined ? (
          <Center flex={1}>
            <Button onPress={() => navigation.navigate('language')} minW={120} padding={5} mt={1} variant="outline" justifyContent="center">
              <Text textAlign={"center"}>You have to define the language to start</Text>
            </Button>
          </Center>
        ) : (
          <Center flex={1}>
            <Button onPress={() => navigation.navigate('registerWord')} minW={120} padding={5} mt={1} variant="outline" justifyContent="center">
              <Text textAlign={"center"}>Register word</Text>
            </Button>

            <Button onPress={() => navigation.navigate('gameOption')} minW={120} padding={5} mt={1} variant="outline" justifyContent="center">
              <Text textAlign={"center"}>Play</Text>
            </Button>
          </Center>
        )
      }

    </ScrollView>
  );
}

