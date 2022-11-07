import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Home';
import LoginScreen from '../Login';
import { useAuth } from '../../modules/user/contexts/AuthContext';
import { Alert, Button } from 'react-native';
import { confirmLogout } from '../../lib/helpers/alert';

const Stack = createStackNavigator();

export const Routes = () => {
    const { isAuthenticated, logout } = useAuth()

    return (
        isAuthenticated ? <LoggedRoutes/> : <UnloggedRoutes/>
    )
}

export const UnloggedRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='login' component={LoginScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export const LoggedRoutes = () => {
    const { logout } = useAuth()

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='home' 
                component={HomeScreen} 
                options={{
                    title: "", 
                    headerRight: () => (
                        <Button
                            onPress={() => confirmLogout(logout)}
                            title="Sair"
                            color="#125ec0"
                        />
                    )
                }} 
            />
        </Stack.Navigator>
    )
}