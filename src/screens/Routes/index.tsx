import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Home';
import LoginScreen from '../Login';

const Stack = createStackNavigator();

export const Routes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='login' component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name='home' component={HomeScreen} options={{title: ""}} />
        </Stack.Navigator>
    )
}