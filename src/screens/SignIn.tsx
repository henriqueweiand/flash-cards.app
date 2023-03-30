import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Button, Center, FormControl, Heading, HStack, Input, ScrollView, VStack } from "native-base";
import { useState } from "react";

import { auth } from '@providers/database/firebase';
import { AuthAsyncStorage } from "@providers/async-storage";

export function SignIn() {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSignIn = async () => {
    const { email, password } = credentials;

    if (email !== "" && password !== "") {
      const authAsyncStorage = new AuthAsyncStorage();

      try {
        const authResponse = await signInWithEmailAndPassword(auth, email, password);

        console.log(authResponse);
        // authAsyncStorage.set(auth);
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

