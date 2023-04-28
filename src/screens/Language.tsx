import Coutries from "@core/providers/Countries";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, CheckIcon, HStack, ScrollView, Select, Text } from "native-base";
import { useState } from "react";
import CountryFlag from "react-native-country-flag";



export function Language() {
  const navigation = useNavigation();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const coutries = Coutries;

  return (
    <Box flex={1}>
      <Center flex={1}>
        <HStack display={'flex'} flexDir={'column'} mb={4}>
          <Text>From</Text>
          <Select selectedValue={from} minWidth="200" accessibilityLabel="Choose Country" placeholder="Choose Country" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={itemValue => setFrom(itemValue)}>
            {
              coutries.map((coutry, index) => <Select.Item key={index} label={coutry.name} value={coutry.code.toLocaleLowerCase()} />)
            }
          </Select>
        </HStack>

        <HStack display={'flex'} flexDir={'column'}>
          <Text>To</Text>
          <Select selectedValue={to} minWidth="200" accessibilityLabel="Choose Country" placeholder="Choose Country" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={itemValue => setTo(itemValue)}>
            {
              coutries.map((coutry, index) => <Select.Item key={index} label={coutry.name} value={coutry.code.toLocaleLowerCase()} />)
            }
          </Select>
        </HStack>
      </Center>

      <Button onPress={() => navigation.goBack()} padding={6} variant="outline" justifyContent="center">
        <Text textAlign={"center"}>Save</Text>
      </Button>
    </Box>
  );
}

