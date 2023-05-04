import { useNavigation } from '@react-navigation/native';
import { Alert, Box, Button, Center, FormControl, Heading, HStack, Input, ScrollView, useToast, VStack } from "native-base";
import { useState } from "react";

import { ToastAlert } from '@components/ToastAlert';
import { AuthFirebase } from '@services/AuthFirebase';
import { Lesson, LessonProps } from '@core/domain/entities/Lesson';
import { FireStoreLesson } from '@core/services/FireStoreLesson';
import { User, UserProps } from '@core/domain/entities/User';

export function SignUp() {
  const toast = useToast();
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    repassword: ''
  });

  const handleSignIn = async () => {
    const { email, password, repassword } = credentials;

    if (email !== "" && password !== "" && password === repassword) {
      const authFirebase = new AuthFirebase();

      try {
        const { user: firebaseUser } = await authFirebase.signup({ email, password });
        const user = new User(firebaseUser.toJSON() as UserProps);

        const lesson = new Lesson({
          email: user.getEmail(),
          userRef: user.getUID()
        } as LessonProps);

        const service = new FireStoreLesson(user)
        service.create({ document: lesson });

        toast.show({
          render: () => {
            return <ToastAlert title="Account was created" />;
          }
        });
        handleGoSignIn();
      } catch (e) {
        toast.show({
          render: () => {
            return <ToastAlert title="Was not possible to make the signup" />;
          }
        });
      }
    } else {
      toast.show({
        render: () => {
          return <ToastAlert title="You have to fill the form out" />;
        }
      });
    }
  };

  const onChange = (field: string, value: string) => {
    setCredentials(e => ({
      ...e,
      [field]: value,
    }))
  }

  const handleGoSignIn = () => {
    navigation.navigate('signIn');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack justifyContent={"center"} flex={1} px={10} pb={16}>
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="8">

            <Heading size="lg" color="coolGray.800" _dark={{
              color: "warmGray.50"
            }} fontWeight="semibold">
              SignUp
            </Heading>

            <Heading mt="1" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="medium" size="xs">
              Sign up to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input onChangeText={(e) => onChange('email', e)} />
              </FormControl>

              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" onChangeText={(e) => onChange('password', e)} />
              </FormControl>

              <FormControl>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input type="password" onChangeText={(e) => onChange('repassword', e)} />
              </FormControl>

              {
                credentials.password !== credentials.repassword && <Alert>The passwords are different</Alert>
              }

              <Button mt="2"
                onPress={handleSignIn} colorScheme="indigo">
                Sign up
              </Button>

            </VStack>
            <HStack mt="6" justifyContent="center">
              <Button
                variant="ghost"
                onPress={handleGoSignIn}
              >
                Sign In
              </Button>
            </HStack>
          </Box>
        </Center>
      </VStack>
    </ScrollView>
  );
}

