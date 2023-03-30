import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, FormControl, Heading, HStack, Input, ScrollView, VStack } from "native-base";
import { useState } from "react";

import { AuthFirebase } from "@core/services/AuthFirebase";
import { AuthAsyncStorage } from "@services/AuthAsyncStorage";

export function SignIn() {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSignIn = async () => {
    const { email, password } = credentials;

    if (email !== "" && password !== "") {
      const authFirebase = new AuthFirebase();
      const authAsyncStorage = new AuthAsyncStorage();

      try {
        const authResponse = await authFirebase.signin({ email, password });

        console.log(authResponse);
        // authAsyncStorage.set(authResponse);
        // handleGoSignUp()
      } catch (e) {
        console.log(e);
        // Add toast
      }
    }
  };

  const handleGoSignUp = () => {
    navigation.navigate('signUp');
  }

  const onChange = (field: string, value: string) => {
    setCredentials(e => ({
      ...e,
      [field]: value,
    }))
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack justifyContent={"center"} flex={1} px={10} pb={16}>
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
              color: "warmGray.50"
            }}>
              Welcome
            </Heading>
            <Heading mt="1" _dark={{
              color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input onChangeText={(e) => onChange('email', e)} />
              </FormControl>

              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" onChangeText={(e) => onChange('password', e)} />
              </FormControl>

              <Button mt="2" colorScheme="indigo" onPress={handleSignIn}>
                Sign in
              </Button>

              <HStack mt="6" justifyContent="center">
                <Button
                  variant="ghost"
                  onPress={handleGoSignUp}
                >
                  Sign Up
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </VStack>
    </ScrollView>
  );
}

