import { NavigationProp } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultButton from '../../lib/components/Button';
import TextField from '../../lib/components/Textfield';
import { changePassword } from '../../modules/application/services';
import { useAuth } from '../../modules/user/contexts/AuthContext';
interface ChangePasswordProps {
  navigation: NavigationProp<any>;
}

const ChangePasswordScreen: FC<ChangePasswordProps> = ({}) => {
  const { user } = useAuth()

  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function onPressChangePassword() {
    setLoading(true)
    
    if (user) {
      let { data, status } = await changePassword(user, currentPassword, newPassword)

    }

    setLoading(false)
  }

  const buttonIsEnabled = () => currentPassword.length > 0 && newPassword.length > 0 && newPassword == confirmPassword

  return ( 
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'position', android: 'padding' })}
        style={styles.container}
      >
        <Text style={styles.title}>Senha atual</Text>
        <TextField
          placeholder='*******'
          containerInputStyles={styles.textField}
          isPassword
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <Text style={styles.title}>Nova senha</Text>
        <TextField
          placeholder='*******'
          containerInputStyles={styles.textField}
          isPassword
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.title}>Confirmar nova senha</Text>
        <TextField
          placeholder='*******'
          containerInputStyles={styles.textField}
          isPassword
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          isValid={newPassword == confirmPassword}
          errorMessage='Sua senha é diferente'
        />

        <DefaultButton
          title='Confirmar'
          style={{marginTop: 50, alignSelf: 'center'}}
          onPress={onPressChangePassword}
          loading={loading}
          enabled={buttonIsEnabled()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    width: '90%',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  textField: {
    marginTop: 10,
    width: '90%',
    borderWidth: 1
  }
})

export default ChangePasswordScreen;
