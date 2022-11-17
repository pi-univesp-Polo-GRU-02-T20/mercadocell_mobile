import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Home';
import LoginScreen from '../Login';
import { useAuth } from '../../modules/user/contexts/AuthContext';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import ChangePasswordScreen from '../ChangePassword';
import SideMenu from '../../lib/components/SideMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const Routes = () => {
    const { isAuthenticated } = useAuth()

    return (
        isAuthenticated ? <DrawerSideMenu/> : <UnloggedRoutes/>
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
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='home' 
                component={HomeScreen} 
                options={{
                    headerShown: true,
                    title: '',
                    headerLeft: () => <DrawerToggleButton/>
                }} 
            />
            <Stack.Screen 
                name='changePassword' 
                component={ChangePasswordScreen} 
                options={{
                    headerShown: true,
                    title: 'Alterar senha',
                    headerBackTitleVisible: false
                }} 
            />
        </Stack.Navigator>
    )
}

export const DrawerSideMenu = () => {
    return (
      <Drawer.Navigator drawerContent={(props) => <SideMenu drawerProps={props} />} >
        <Drawer.Screen name="Home" component={LoggedRoutes} options={{title: '', headerShown: false}} />
      </Drawer.Navigator>
    );
  }