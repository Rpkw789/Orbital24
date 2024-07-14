import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BackButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        width: 100,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default BackButton;
