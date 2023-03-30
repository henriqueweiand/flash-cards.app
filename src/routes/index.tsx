

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box } from 'native-base';

import { useAuth } from "@hooks/Auth";
import { Loading } from "@components/Loading";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
    const { authenticated, loading } = useAuth();
    const theme = DefaultTheme;

    if (loading)
        return <Loading />

    return (
        <Box flex={1}>
            {
                <NavigationContainer theme={theme}>
                    {
                        authenticated ? <AppRoutes /> : <AuthRoutes />
                    }
                </NavigationContainer>
            }
        </Box>
    );
}