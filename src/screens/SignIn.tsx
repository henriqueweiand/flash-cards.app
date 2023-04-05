import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, FormControl, Heading, HStack, Input, ScrollView, useToast, VStack } from "native-base";
import { useState } from "react";

import { ToastAlert } from "@components/ToastAlert";
import { useAuth } from "@hooks/Auth";
import { AuthFirebase } from "@services/AuthFirebase";
import { User, UserProps } from "@core/domain/entities/User";

export function SignIn() {
  const navigation = useNavigation();
  const toast = useToast();
  const { set: authSet } = useAuth();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSignIn = async () => {
    const { email, password } = credentials;

    if (email !== "" && password !== "" && password.length >= 6) {
      const authFirebase = new AuthFirebase();

      try {
        const { user: firebaseUser } = await authFirebase.signin({ email, password });
        const user = new User(firebaseUser.toJSON() as UserProps);

        authSet(user);
      } catch (e) {
        toast.show({
          render: () => {
            return <ToastAlert title="Was not possible to make the singin" />;
          }
        });
      }
    } else {
      toast.show({
        render: () => {
          return <ToastAlert title="Was not possible to submit" description="You have to fill the form out and the password must have more than 5 words" />;
        }
      });
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

