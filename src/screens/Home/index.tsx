import { NavigationProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
       <Text>Welcome to Mercadocell</Text>
       <Button title='Ir para login' onPress={() => navigation.navigate('login')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeScreen;
