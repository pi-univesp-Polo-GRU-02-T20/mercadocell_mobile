import { NavigationProp } from '@react-navigation/native';
import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DefaultButton from '../../lib/components/Button';
import TextField, { TextFieldForm } from '../../lib/components/Textfield';
import { changePassword } from '../../modules/application/services';
import { useAuth } from '../../modules/user/contexts/AuthContext';
import Toast from 'react-native-toast-message';
interface ChangePasswordProps {
  navigation: NavigationProp<any>;
}

const ChangePasswordScreen: FC<ChangePasswordProps> = ({}) => {
  const { user } = useAuth()

  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const refCurrentPassword = useRef<TextFieldForm>(null)
  const refNewPassword = useRef<TextFieldForm>(null)
  const refConfirmPassword = useRef<TextFieldForm>(null)

  useEffect(() => {
      if (refConfirmPassword.current?.withError() && newPassword == confirmPassword) {
        refConfirmPassword.current.hideError()
      }
  }, [newPassword, confirmPassword])

  async function onPressChangePassword() {
    setLoading(true)

    let fieldsIsValid = validateFields()

    if (user && fieldsIsValid) {
      let { status } = await changePassword(user, currentPassword, newPassword)

      setLoading(false)

      if (status == 401) {
        refCurrentPassword.current?.showError('Senha incorreta')
        return
      }

      if (status == 200) {
        Toast.show({
          type: 'success',
          text1: 'Senha alterada com sucesso!',
          position: 'bottom'
        })
        return
      }

      Toast.show({
        type: 'error',
        text1: 'Um erro inesperado ocorreu, tente novamente!',
        position: 'bottom'
      })

    }

    if (!fieldsIsValid) {
      setLoading(false)
    }
  }

  function validateFields(): boolean {
    if (newPassword !== confirmPassword) {
      refConfirmPassword.current?.showError('As senhas devem ser iguais')
      return false
    } else {
      refConfirmPassword.current?.hideError()
    }

    return true
  }

  const buttonEnabled = () => currentPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0

  function onCurrentPasswordChange(value: string) {
    setCurrentPassword(value)
    if (refCurrentPassword.current?.withError()) {
      refCurrentPassword.current?.hideError()
    }
  }

  return ( 
    <Fragment>
      <ScrollView style={styles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'position', android: 'padding' })}
          style={styles.container}
        >
          <Text style={styles.title}>Senha atual</Text>
          <TextField
            ref={refCurrentPassword}
            placeholder='*******'
            containerInputStyles={styles.textField}
            isPassword
            value={currentPassword}
            onChangeText={onCurrentPasswordChange}
          />

          <Text style={styles.title}>Nova senha</Text>
          <TextField
            ref={refNewPassword}
            placeholder='*******'
            containerInputStyles={styles.textField}
            isPassword
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={styles.title}>Confirmar nova senha</Text>
          <TextField
            ref={refConfirmPassword}
            placeholder='*******'
            containerInputStyles={styles.textField}
            isPassword
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <DefaultButton
            title='Confirmar'
            style={{marginTop: 50, alignSelf: 'center'}}
            onPress={onPressChangePassword}
            loading={loading}
            enabled={buttonEnabled()}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <Toast/>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
