import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TextField from '../../lib/components/Textfield';
import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultButton from '../../lib/components/Button';

const LoginScreen = () => {
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextField 
          containerInputStyles={styles.input}
          renderLeftIcon={() => <Icon name='user' size={20} color='#a8a8a8' />}
          placeholder='Usuário'
          onChangeText={setUser}
          value={user}
        />
        <TextField 
          containerInputStyles={styles.input}
          renderLeftIcon={() => <Icon name='lock' size={20} color='#a8a8a8' />}
          isPassword
          placeholder='Senha'
          onChangeText={setPassword}
          value={password}
        />
        <DefaultButton 
          title='ACESSAR' 
          style={styles.button}
          onPress={() => Alert.alert('oi')}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#125ec0',
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  container: {
    padding: 16
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  input: {
    marginTop: 24
  },
  button: {
    marginTop: 30,
    width: '60%',
    alignSelf: 'center'
  }
})

export default LoginScreen;
