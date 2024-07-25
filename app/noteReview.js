import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { firestore } from '../firebaseConfig';
import { collection, addDoc } from '@firebase/firestore';

const noteReview = () => {
    const router = useRoute();
    const { note } = router.params;
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = async () => {
        if (review.trim() === '' || rating.trim() === '') {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const ratingNumber = parseInt(rating, 10);
        if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
            Alert.alert('Error', 'Please enter a valid rating between 1 and 5.');
            return;
        }

        try {
            // Add a new review to the 'reviews' collection
            await addDoc(collection(firestore, `notes/${note.id}/reviews`), {
                review,
                rating: ratingNumber,
            });

            Alert.alert('Success', 'Review submitted successfully!');
            setReview('');
            setRating('');
        } catch (error) {
            console.error('Error adding document: ', error);
            Alert.alert('Error', 'Failed to submit review.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.innercontainer}>
                <Text style={styles.title}> Give a review for {note.name}! </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Write your review here..."
                    value={review}
                    onChangeText={setReview}
                    multiline
                    numberOfLines={4}
                />
                <Text style={styles.title}>Give a rating</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rating (1-5)"
                    value={rating}
                    onChangeText={setRating}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit Review</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
};

function createDatabaseFolderUser(tutor) {
    const docRef = doc(firestore, 'tutor', user.uid);
    setDoc(docRef, {
        name: values.name,
        role: values.role,
        email: values.email,
        school: values.school,
    })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9EDE3',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    innercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 40,
        paddingTop: 40
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        backgroundColor: '#F9EDE3',
        textAlign: 'center',
        marginHorizontal: 10
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#86A49C',
        width: '100%',
        
    },
    submitButton: {
        backgroundColor: '#F5CAC2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        marginTop: 10
    },
    submitButtonText: {
        fontSize: 17,
        color: 'black',
    },
});

export default noteReview;