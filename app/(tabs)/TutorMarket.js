import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native';
import Homepage from '../../components/homepage';

const TutorMarket = () => {
    return (
        <ScrollView style={styles.container}>
            <Homepage />
            <Text> Tutors</Text>
        </ScrollView>

    );
};

export default TutorMarket;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3"
    },

});