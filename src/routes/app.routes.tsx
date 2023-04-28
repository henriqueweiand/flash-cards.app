import { useAuth } from '@core/hooks/Auth';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameOptionPage } from '@screens/GameOptions/page';
import { Games } from '@screens/Games';
import { Language } from '@screens/Language';
import { RegisterWord } from '@screens/RegisterWord';
import { Icon, Button, Text } from 'native-base';
// import { GameSelect } from '@screens/GameSelect';
// import { GameTranslate } from '@screens/GameTranslate';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function AppRoutes() {
    const { logoff } = useAuth()
    const navigation = useNavigation();

    return (
        <Navigator screenOptions={{
            headerShown: false,
            title: '',
            headerLeft: () => (
                <Button
                    colorScheme='light'
                    size={'sm'}
                    onPress={() => navigation.navigate('language')}
                >
                    Language
                </Button>
            ),
            headerRight: () => (
                <Button
                    colorScheme='light'
                    size={'sm'}
                    onPress={() => {
                        logoff();
                    }}
                >
                    Log off
                </Button>
            )

        }}>
            <Group screenOptions={{ headerShown: true }}>
                <Screen
                    name='games'
                    component={Games}
                />
            </Group>

            <Group screenOptions={{ presentation: 'modal' }}>
                <Screen
                    name='language'
                    component={Language}
                    options={{
                        animation: 'simple_push'
                    }}
                />

                <Screen
                    name='registerWord'
                    component={RegisterWord}
                    options={{
                        animation: 'simple_push'
                    }}
                />

                <Screen
                    name='gameOption'
                    component={GameOptionPage}
                    options={{
                        animation: 'simple_push'
                    }}
                />
            </Group>
            {/* <Screen
                name='gameSelect'
                component={GameSelect}
            />
            <Screen
                name='gameTranslate'
                component={GameTranslate}
            /> */}
        </Navigator>
    );
}