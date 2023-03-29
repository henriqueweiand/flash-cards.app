import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Alert, Box, Button, Center, FormControl, Heading, Input, VStack } from "native-base";
import { useState } from "react";
import { auth } from '../config/firebase';

export function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('henriqueweiand@gmail.com');
  const [password, setPassword] = useState('Abc12345');
  const [repassword, setRepassword] = useState('');

  const onHandleSignup = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch((err) => console.log("SignIn error", err));
    }
  };

  const handleGoSignIn = () => {
    navigation.navigate('SignIn');
  }

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">

        <Heading size="lg" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} fontWeight="semibold">
          Welcome
        </Heading>

        <Heading mt="1" color="coolGray.600" _dark={{
          color: "warmGray.200"
        }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChange={(e) => setEmail(e)} />
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChange={(e) => setPassword(e)} />
          </FormControl>

          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" onChange={(e) => setRepassword(e)} />
          </FormControl>

          {
            password !== repassword && <Alert>The passwords are different</Alert>
          }

          <Button mt="2"
            onPress={onHandleSignup} colorScheme="indigo">
            Sign up
          </Button>

        </VStack>
      </Box>
    </Center>
  );
}

