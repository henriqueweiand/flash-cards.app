import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Button, Center, FormControl, Heading, HStack, Input, Link, VStack, Text } from "native-base";
import { useState } from "react";
import { auth } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => console.log("Login error", err.message));
    }
  };

  const handleGoSignUp = () => {
    navigation.navigate('SignUp');
  }

  const onChange = (e) => console.log(e);

  return (
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
            <Input onChangeText={onChange} />
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={onChange} />
          </FormControl>

          <Button mt="2" colorScheme="indigo">
            Sign in
          </Button>

          <HStack mt="6" justifyContent="center">
            <Button
              variant="outline"
              onPress={handleGoSignUp}
            >
              Sign Up
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}

