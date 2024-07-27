import React, {useEffect} from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { doc, setDoc, collection, getDocs, addDoc, getDoc } from '@firebase/firestore';
import { firestore } from '../firebaseConfig';

const TutorDetails = () => {
    const route = useRoute();
    const { tutor } = route.params;
    const navigation = useNavigation();
    const [reviews, setReviews] = useState([]);
    const [tutorr, setTutorr] = useState(tutor)

    const fetchReviewsData = async () => {
        try {
            const reviewsDocsRef = collection(firestore, `users/${tutor.id}/reviews`);
            const reviewsDocs = await getDocs(reviewsDocsRef);
            const reviewsData = reviewsDocs.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            const tutorRef = doc(collection(firestore, `users`),tutor.id);
            const tutorDoc = await getDoc(tutorRef);
            let tutorData = tutorDoc.data();
            setReviews(reviewsData);
            setTutorr({
                ...tutor,
                reviews: reviews,
                ...tutorData,
            })
            console.log(tutorr);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchReviewsData();
    },[])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Image source={{ uri: tutor.image }} style={styles.pic} />
                <View style={styles.content}>
                    <Text style={styles.title}>{tutor.name}</Text>
                    <Text style={{ fontSize: 27, marginBottom: 10 }}>${tutor.rate}/hr</Text>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>{tutor.subject}</Text>
                    <Text style={styles.smalltext}>Description</Text>
                    <Text style={styles.description}>{tutor.description}</Text>
                    <Text style={styles.smalltext}>Reviews</Text>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.description}>{tutor.starRating}</Text>
                        <Icon name="star" color="#F7BE61" size={20} marginLeft ={5}/>
                    </View>

                </View>
                {/* Empty view to push content above the buttons */}
                <View style={styles.contentSpacer} />
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Pressed Chat with Tutor")}>
                    <Text style={styles.buttonText}>Chat with Tutor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TutorProfilePage', {tutorr})}>
                    <Text style={styles.buttonText}>Visit Tutor Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3",
    },
    scrollContainer: {
        flex: 1,
    },
    pic: {
        width: '100%',
        height: 400,
        marginBottom: 10,
    },
    content: {
        padding: 20,
    },
    contentSpacer: {
        height: 100, // Adjust as needed to push content above buttons
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    smalltext: {
        color: '#86A49C',
        marginBottom: 5,
        fontWeight: "bold"
    },
    description: {
        fontSize: 17,
        marginBottom: 10
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff', // Ensure contrast with the background
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        height: 90,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 7,
        backgroundColor: "#F48584",
        height: 50,
        justifyContent: "center"
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 17
    },
});

export default TutorDetails;
