import React, { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import Homepage from '../../components/homepage';
import TutorCard from '../../components/TutorCard';
import { firestore } from '../../firebaseConfig';
import { getDocs, collection } from '@firebase/firestore';

const TutorMarket = () => {

    const [tutorsData, setTutorsData] = useState([]);

    const fetchTutorData = async () => {
        try {
            const tutorDocsRef = collection(firestore, 'tutors');
            const tutorDocs = await getDocs(tutorDocsRef);
            const tutors = tutorDocs.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTutorsData(tutors);
        } catch (e) {
            console.error('Error fetching tutors collection:', e);
        }
    }

    const handleTutorPress = (tutor) => {
        Alert.alert("Tutor Selected", `You selected ${tutor.name}`);
    };

    useFocusEffect(
        useCallback(() => {
            fetchTutorData();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Homepage />
            <ScrollView>
                {tutorsData.map((tutor) => (
                    <TutorCard key={tutor.id} tutor={tutor} onPress={handleTutorPress} />
                ))}
            </ScrollView>
        </View>

    );
};

export default TutorMarket;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3"
    },

});