import { Text, HStack, ScrollView, VStack, Box, FormControl, Input, CheckIcon, Select, Button } from "native-base";
import { useState } from "react";

export function RegisterWord() {
  const [service, setService] = useState("");
  const [service2, setService2] = useState("");

  const onChange = (e) => console.log(e);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flexDir={"column"} display="flex" justifyContent={"space-between"} flex={1} px={10} pt={10}>

        <HStack display={"flex"} flexDir="column" flex={1} justifyContent="center">
          <Box>
            <Text>The translation is one of them?</Text>
            <Box display={"flex"} flexDir="row" flexWrap={"wrap"} justifyContent="space-between">
              {
                [1, 2, 3, 4].map((key) => (
                  <Box key={key} minW={120} flex={1} padding={10} background={"amber.100"} textAlign={"center"}>
                    <Text>Option {key}</Text>
                  </Box>
                ))
              }
            </Box>
          </Box>

          <Box pt={5}>
            <FormControl>
              <FormControl.Label>Or write down yours answere</FormControl.Label>
              <Input type="text" onChangeText={onChange} />
            </FormControl>
          </Box>

        </HStack>

        <HStack display={"flex"} flexDir={"column"} pt={5}>

          <Box display={"flex"} flexDir="row">
            <Box maxW="300">
              <Select selectedValue={service} accessibilityLabel="Choose language" placeholder="Choose language" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                <Select.Item label="English" value="EN" />
                <Select.Item label="Portuguese" value="PT" />
              </Select>
            </Box>

            <Box maxW="300">
              <Select selectedValue={service2} accessibilityLabel="Choose language" placeholder="Choose language" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setService2(itemValue)}>
                <Select.Item label="English" value="EN" />
                <Select.Item label="Portuguese" value="PT" />
              </Select>
            </Box>
          </Box>

          <Box>
            <FormControl>
              <FormControl.Label>word</FormControl.Label>
              <Input type="text" onChangeText={onChange} />
            </FormControl>
            <Button onPress={() => console.log("hello world")}>Send</Button>
          </Box>

        </HStack>
      </VStack>
    </ScrollView>
  );
}

