import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TutorExperience = ({ experience }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Experience</Text>
            <Text style={styles.details}>{experience}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    details: {
        fontSize: 16,
    },
    // Add more styles as needed
});

export default TutorExperience;
