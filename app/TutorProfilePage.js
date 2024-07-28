import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import TutorProfileHeader from '../components/TutorProfileHeader';
import TutorQualifications from '../components/TutorQualifications';
import TutorExperience from '../components/TutorExperience';
import TutorReviews from '../components/TutorReviews';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { useContext } from 'react';
import { AppContext } from '../context/userContext';


const TutorProfilePage = () => {
    const router = useRoute();
    const { tutorr } = router.params;
    const navigation = useNavigation();
    const [userData, setUser] = useState(null)
    const { user } = useContext(AppContext);

    const handlePress = async () => {
        navigation.navigate('tutorReview', { tutorr });
    }

    const fetchUserData = async () => {
        try {
            const userDocRef = doc(collection(firestore, 'users'), `${user.uid}`);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userDatak = {
                    uid: userDoc.id,
                    ...userDoc.data()
                }
                setUser(userDatak);
            }
        } catch (error) {
            console.error('Error fetching user document:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    })

    return (
        <ScrollView style={styles.container}>
            <TutorProfileHeader tutor={tutorr} />
            <TutorQualifications qualifications={tutorr ? tutorr.qualifications : ''} />
            <TutorExperience experience={tutorr.experience} />
            <TutorReviews reviews={tutorr.reviews} />
            {(() => {
                if (userData) {
                    if (userData.role != 'teacher') {
                        return <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={handlePress}
                            style={styles.review}>
                            <Text style={{ fontSize: 17, color: 'black' }}>Leave a review</Text>
                        </TouchableOpacity>
                    </View>
                    }
                }
            })()}
            

        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9EDE3',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    review: {
        backgroundColor: '#F5CAC2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 130,
        height: 40,
        padding: 5
    }
});

export default TutorProfilePage;
