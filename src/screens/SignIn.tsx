import { Center, Text, VStack } from "native-base";

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700">
      <Center my={24}>
        <Text color="gray.100" fontSize="sm">
          Signin
        </Text>
      </Center>
    </VStack>
  );
}
