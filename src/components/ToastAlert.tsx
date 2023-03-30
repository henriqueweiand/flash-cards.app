import { Alert, HStack, Text, VStack } from "native-base";

interface IToastAlert {
    id?: number;
    status?: string;
    title: string;
    description?: string;
}

export const ToastAlert = ({
    id = Math.random(),
    status = "info",
    title,
    description,
    ...rest
}: IToastAlert) => {
    return (
        <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status ? status : "info"} variant={"subtle"} {...rest}>
            <VStack space={1} flexShrink={1} w="100%">
                <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
                    <HStack space={2} flexShrink={1} alignItems="center">
                        <Alert.Icon />
                        <Text fontSize="md" fontWeight="medium" flexShrink={1} color={"darkText"}>
                            {title}
                        </Text>
                    </HStack>
                </HStack>
                {
                    !!description && (
                        <Text px="6" color={"darkText"}>
                            {description}
                        </Text>
                    )
                }
            </VStack>
        </Alert>
    )
};