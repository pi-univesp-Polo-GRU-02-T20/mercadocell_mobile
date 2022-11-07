import React, { FC, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TextField from '../../lib/components/Textfield';
import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultButton from '../../lib/components/Button';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '../../modules/user/contexts/AuthContext';
interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { login, loading, isAuthenticated, statusCodeLogin } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' }],
      });
    }
  }, [isAuthenticated])

  async function signIn() {
    await login(user, password)
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'position', android: 'padding' })}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextField 
            containerInputStyles={styles.input}
            renderLeftIcon={() => <Icon name='user' size={20} color='#a8a8a8' />}
            placeholder='Usuário'
            onChangeText={setUser}
            value={user}
            autoCapitalize='none'
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
            onPress={signIn}
            loading={loading}
          />
          {statusCodeLogin === 401 && <Text style={styles.errorMessage}>Usuário ou senha inválidos. Tente novamente</Text>}
          {statusCodeLogin === 500 && <Text style={styles.errorMessage}>Não foi possível efetuar o login, ocorreu um erro inesperado</Text>}
        </View>
      </KeyboardAvoidingView>
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
  },
  errorMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20
  }
})

export default LoginScreen;
