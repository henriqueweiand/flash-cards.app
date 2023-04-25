import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { RegisterWord } from '@screens/RegisterWord';
import { GameOptionPage } from '@screens/GameOptions/page';
import { GameTranslate } from '@screens/GameTranslate';
import { GameSelect } from '@screens/GameSelect';
import { Games } from '@screens/Games';

type AppRoutes = {
    games: undefined;
    gameSelect: undefined;
    gameTranslate: undefined;
    registerWord: undefined;
    gameOption: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

    const { sizes, colors } = useTheme();

    const iconSize = sizes[6];

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.green[500],
            tabBarInactiveTintColor: colors.gray[200],
            tabBarStyle: {
                backgroundColor: colors.gray[600],
                borderTopWidth: 0,
                height: Platform.OS === "android" ? 'auto' : 96,
                paddingBottom: sizes[10],
                paddingTop: sizes[6]
            }
        }}>
            <Screen
                name='registerWord'
                component={RegisterWord}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="create-outline" size={iconSize} color={color} />
                    )
                }}
            />
            <Screen
                name='games'
                component={Games}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={iconSize} color={color} />
                    )
                }}
            />

            <Screen
                name='gameSelect'
                component={GameSelect}
                options={{ tabBarButton: () => null }}
            />

            <Screen
                name='gameTranslate'
                component={GameTranslate}
                options={{ tabBarButton: () => null }}
            />

            <Screen
                name='gameOption'
                component={GameOptionPage}
                options={{ tabBarButton: () => null }}
            />

        </Navigator>
    );
}