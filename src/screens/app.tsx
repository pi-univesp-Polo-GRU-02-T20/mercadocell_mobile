import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Routes } from './Routes';

const App = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
