import React, { FC } from "react";
import { StyleSheet, Text, View, Pressable, ViewStyle } from "react-native";

interface ButtonProps {
    title: string;
    style?: ViewStyle | ViewStyle[],
    onPress?: () => void
}

const DefaultButton: FC<ButtonProps> = ({ title, style, onPress }) => 
    <Pressable style={{...styles.container, ...style}} onPress={onPress} >
        <Text style={styles.text}>{title}</Text>
    </Pressable>

const styles = StyleSheet.create({  
    container: {
        padding: 16,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    }
})

export default DefaultButton