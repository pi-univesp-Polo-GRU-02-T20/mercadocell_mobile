import React, { FC, Fragment, ReactNode, useState } from "react";
import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

interface TextfieldProps {
    containerInputStyles?: ViewStyle | ViewStyle[],
    renderLeftIcon?: () => ReactNode,
    isPassword?: boolean,
    placeholder?: string,
    onChangeText?: (text: string) => void;
    value?: string;
    maxLength?: number;
    errorMessage?: string;
    isValid?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined
}

const TextField: FC<TextfieldProps> = ({ containerInputStyles, renderLeftIcon, isPassword, placeholder, onChangeText, value, maxLength, autoCapitalize, errorMessage, isValid = true}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [focused, setFocused] = useState<boolean>(false)

    return (
        <Fragment>
            <View style={{...styles.containerInput, ...containerInputStyles, borderColor: !isValid ? 'red' : focused ? '#125ec0' :'#b8b8b8'}} >
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
            {!isValid && errorMessage &&
                <Text style={styles.errorMessage} >{errorMessage}</Text>
            }
        </Fragment>
    )
}

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
        color: 'red',
        fontSize: 14,
        marginTop: 10
    }
})

export default TextField