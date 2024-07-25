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
        backgroundColor: '#F48584',
        padding: 5,
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginLeft: 5,
        height: 37
    },
    text: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold'
    },
});

export default BackButton;
