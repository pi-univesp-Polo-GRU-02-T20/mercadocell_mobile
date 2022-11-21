import React, { FC, forwardRef, Fragment, ReactNode, useImperativeHandle, useState } from "react";
import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

interface TextFieldProps {
    containerInputStyles?: ViewStyle | ViewStyle[];
    renderLeftIcon?: () => ReactNode;
    isPassword?: boolean;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
    maxLength?: number;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined,
    errorMessageColor?: string;
}

export interface TextFieldForm {
    showError: (message: string) => void;
    hideError: () => void;
    withError: () => boolean;
}

const TextField = forwardRef<TextFieldForm, TextFieldProps>(({ containerInputStyles, renderLeftIcon, isPassword, placeholder, onChangeText, value, maxLength, autoCapitalize, errorMessageColor = 'red'}, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [focused, setFocused] = useState<boolean>(false)
    const [showErrorMessage, setShowErrorMessage] = useState<string | null>(null)

    useImperativeHandle(ref, () => ({
        showError: (message) => {
            setShowErrorMessage(message)
        },
        hideError: () => {
            setShowErrorMessage(null)
        },
        withError: () => {
            return showErrorMessage != null
        }
    }));

    return (
        <Fragment>
            <View style={{...styles.containerInput, ...containerInputStyles, borderColor: showErrorMessage ? 'red' : focused ? '#125ec0' :'#b8b8b8'}} >
                {renderLeftIcon && renderLeftIcon()}
                <TextInput
                    testID='testID_textfield'
                    style={styles.input} 
                    secureTextEntry={isPassword && !showPassword} 
                    placeholder={placeholder} 
                    onChangeText={onChangeText}
                    value={value}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                {isPassword && <Icon name={showPassword ? 'eye-off' : 'eye'} color='#a8a8a8' size={20} onPress={() => setShowPassword(old => !old)} />}
            </View>
            {showErrorMessage &&
                <Text style={{...styles.errorMessage, color: errorMessageColor}} >{showErrorMessage}</Text>
            }
        </Fragment>
    )
}) 

const styles = StyleSheet.create({
    containerInput: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        height: '100%',
        marginLeft: 10
    },
    errorMessage: {
        fontSize: 14,
        marginTop: 10
    }
})

export default TextField