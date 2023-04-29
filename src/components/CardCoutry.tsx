import { Button, Center, Text } from "native-base";
import React from "react";
import CountryFlag from "react-native-country-flag";

interface CountryCard {
    name: string;
    code: string;
    onPress: () => void;
    active: boolean;
}

export const CountryCard = ({ name, code, onPress, active }: CountryCard) => (
    <Button onPress={onPress} ml={3} p={5} variant={active ? 'solid' : 'outline'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Text bold mb={1}>{name}</Text>
        <Center>
            <CountryFlag isoCode={code.toLowerCase()} size={18} />
        </Center>
    </Button>
)