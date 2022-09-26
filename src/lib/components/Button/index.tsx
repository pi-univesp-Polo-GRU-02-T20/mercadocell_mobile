import React, { FC } from "react";
import { StyleSheet, Text, ActivityIndicator, Pressable, ViewStyle } from "react-native";

interface ButtonProps {
    title: string;
    style?: ViewStyle | ViewStyle[],
    loading?: boolean,
    onPress?: () => void
}

const DefaultButton: FC<ButtonProps> = ({ title, style, onPress, loading }) => 
    <Pressable style={{...styles.container, ...style}} disabled={loading} onPress={onPress} >
        {loading 
            ? <ActivityIndicator color='#125ec0' />
            : <Text style={styles.text}>{title}</Text>
        }
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