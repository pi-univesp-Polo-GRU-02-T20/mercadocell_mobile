import React, { FC, ReactNode, useState } from "react";
import { StyleSheet, TextInput, View, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

interface TextfieldProps {
    containerInputStyles?: ViewStyle | ViewStyle[],
    renderLeftIcon?: () => ReactNode,
    isPassword?: boolean,
    placeholder?: string,
    onChangeText?: (text: string) => void;
    value?: string;
    maxLength?: number;
}

const TextField: FC<TextfieldProps> = ({ containerInputStyles, renderLeftIcon, isPassword, placeholder, onChangeText, value, maxLength }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <View style={{...styles.containerInput, ...containerInputStyles}} >
            {renderLeftIcon && renderLeftIcon()}
            <TextInput
                testID='testID_textfield'
                style={styles.input} 
                secureTextEntry={isPassword && !showPassword} 
                placeholder={placeholder} 
                onChangeText={onChangeText}
                value={value}
                maxLength={maxLength}
            />
            {isPassword && <Icon name={showPassword ? 'eye-off' : 'eye'} color='#a8a8a8' size={20} onPress={() => setShowPassword(old => !old)} />}
        </View>
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
        padding: 10
    },
    input: {
        flex: 1,
        height: '100%',
        marginLeft: 10
    }
})

export default TextField