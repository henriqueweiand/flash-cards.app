import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/Auth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
    const { authenticated, loading } = useAuth();
    const theme = DefaultTheme;

    if (loading)
        return <Loading />

    return (
        <NavigationContainer theme={theme}>
            {
                authenticated ? <AppRoutes /> : <AuthRoutes />
            }
        </NavigationContainer>
    );
}