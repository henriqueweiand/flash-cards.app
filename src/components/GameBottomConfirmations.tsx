import { useGame } from "@core/hooks/Game";
import { Button, HStack, Text } from "native-base";
import React, { useState } from "react";

interface GameBottomConfirmations {
    enableCheck: boolean;
    answerIsRight: boolean
    nextGameCallback: () => void;
}

export const GameBottomConfirmations = ({
    enableCheck = false,
    answerIsRight,
    nextGameCallback,
}: GameBottomConfirmations) => {
    const { next } = useGame();
    const [answerFeedback, setAnswerFeedback] = useState<boolean>(false);

    if (!enableCheck) return <></>

    return (
        <HStack display={"flex"} flexDir={"column"} justifyContent="center" pt={5}>
            {
                !answerFeedback ? (
                    <Button onPress={() => setAnswerFeedback(true)} rounded={"3xl"} padding={8} variant='solid' colorScheme={"primary"} textAlign={"center"}>
                        <Text>Check</Text>
                    </Button>
                ) : (
                    <Button onPress={() => {
                        if (!!nextGameCallback)
                            nextGameCallback();

                        next({ rightAnswer: answerIsRight });
                        setAnswerFeedback(false);
                    }} rounded={"3xl"} padding={8} variant='solid' colorScheme={answerIsRight ? 'green' : 'red'} textAlign={"center"}>
                        <Text>Next</Text>
                    </Button>
                )
            }
        </HStack>
    )
};