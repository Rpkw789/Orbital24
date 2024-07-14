import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const TutorProfileHeader = ({ tutor }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: tutor.image }} style={styles.profileImage} />
            <Text style={styles.name}>{tutor.name}</Text>
            {/* Add more details like location, contact info, etc. */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    // Add more styles as needed
});

export default TutorProfileHeader;
