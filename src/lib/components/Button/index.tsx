import React, { FC } from "react";
import { StyleSheet, Text, ActivityIndicator, Pressable, ViewStyle } from "react-native";

interface ButtonProps {
    title: string;
    style?: ViewStyle | ViewStyle[],
    loading?: boolean,
    onPress?: () => void,
    enabled?: boolean
}

const DefaultButton: FC<ButtonProps> = ({ title, style, onPress, loading, enabled = true }) => 
    <Pressable style={{...styles.container, ...style, opacity: enabled ? 1 : 0.5 }} disabled={loading || !enabled} onPress={onPress} >
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