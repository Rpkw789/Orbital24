import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native';
import Homepage from '../../components/homepage';

const NotesMarket = () => {
    return (
        <ScrollView style={styles.container}>
            <Homepage />
            <Text> Notes</Text>
        </ScrollView>

    );
};

export default NotesMarket;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3"
    },

});