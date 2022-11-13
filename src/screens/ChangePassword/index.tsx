import { NavigationProp } from '@react-navigation/native';
import React, { FC } from 'react';
import {  StyleSheet, View } from 'react-native';

interface ChangePasswordProps {
  navigation: NavigationProp<any>;
}

const ChangePasswordScreen: FC<ChangePasswordProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
})

export default ChangePasswordScreen;
