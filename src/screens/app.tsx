import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from '../modules/user/contexts/AuthContext';
import { Routes } from './Routes';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
