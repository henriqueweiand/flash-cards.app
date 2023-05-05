import { useAuth } from '@core/hooks/Auth';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameOptionPage } from '@screens/GameOptions/page';
import { Home } from '@screens/Home';
import { Language } from '@screens/Language';
import { RegisterWord } from '@screens/RegisterWord';
import { Icon, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
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
                    variant={'ghost'}
                    size={'sm'}
                    m={0}
                    p={0}
                    onPress={() => navigation.navigate('language')}
                >
                    <Icon size="6" as={Ionicons} name="language-outline" />
                </Button>
            ),
            headerRight: () => (
                <Button
                    colorScheme='light'
                    variant={'ghost'}
                    m={0}
                    p={0}
                    size={'sm'}
                    onPress={() => {
                        logoff();
                    }}
                >
                    <Icon size="6" as={Ionicons} name="log-out-outline" />
                </Button>
            )

        }}>
            <Group screenOptions={{ headerShown: true }}>
                <Screen
                    name='home'
                    component={Home}
                />
            </Group>

            <Group>
                <Screen
                    name='language'
                    component={Language}
                    options={{
                        animation: 'fade_from_bottom'
                    }}
                />
            </Group>

            <Group screenOptions={{ presentation: 'modal' }}>

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