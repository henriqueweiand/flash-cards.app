import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Profile } from '@screens/Profile';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen
                    name="SignIn"
                    component={SignIn}
                />
                <Screen
                    name="SignUp"
                    component={SignUp}
                />
                <Screen
                    name="Profile"
                    component={Profile}
                />
            </Navigator>
        </NavigationContainer>
    )
}