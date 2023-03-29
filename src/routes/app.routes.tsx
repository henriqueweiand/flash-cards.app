import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { RegisterWord } from '@screens/RegisterWord';

type AppRoutes = {
    registerWord: undefined;
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
        </Navigator>
    );
}