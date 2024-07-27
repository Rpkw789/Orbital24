import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native";

const PublishIndex = ({ setPage }) => {

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setPage(1) }}
                >
                    <Text style={styles.buttonText}>Upload Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setPage(2) }}
                >
                    <Text style={styles.buttonText}>Create Tutor Listing</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PublishIndex;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9EDE3',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    button: {
        backgroundColor: '#344869',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: '45%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});