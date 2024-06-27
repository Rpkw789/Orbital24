import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Btn from "../components/Btn"
import { useRouter } from 'expo-router';

const editprofilepage = () => {
    return(
        <View style= {styles.container}>
            <Text>
                edit profile
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3",

    }
});

export default editprofilepage;