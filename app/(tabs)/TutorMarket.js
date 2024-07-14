import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import Homepage from '../../components/homepage';
import TutorCard from '../../components/TutorCard';
import SubjectCard from '../../components/SubjectCard';
import BackButton from '../../components/BackTutorFolder';
import { firestore } from '../../firebaseConfig';
import { getDocs, collection } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native'; 

const TutorMarket = () => {

    const [tutorsData, setTutorsData] = useState([]);
    const [path, setPath] = useState('tutors');
    const [isTitle, setIsTitle] = useState(true);
    const navigation = useNavigation();

    const fetchTutorData = async () => {
        try {
            const tutorDocsRef = collection(firestore, path);
            const tutorDocs = await getDocs(tutorDocsRef);
            const tutors = await Promise.all(tutorDocs.docs.map(async doc => {
                const reviewsDocsRef = collection(firestore, `${path}/${doc.id}/reviews`);
                const reviewsDocs = await getDocs(reviewsDocsRef);
                const reviews = reviewsDocs.docs.map(rDoc => ({
                    id: rDoc.id,
                    ...rDoc.data()
                }));
                return {
                    id: doc.id,
                    ...doc.data(),
                    reviews: reviews
                };
            }));
            setTutorsData(tutors);
            console.log(path);
        } catch (e) {
            console.error('Error fetching tutors collection:', e);
        }
    }

    const handleTutorPress = (tutor) => {
        navigation.navigate('TutorDetails', {tutor});
    };

    const handleSubjectPress = (subject) => {
        setPath(`${path}/${subject.id}/${subject.id}`);
        if(subject.id.startsWith("title")) {
            setIsTitle(true);
        } else {
            setIsTitle(false);
        }
    }

    const handleBack = () => {
        const parts = path.split('/')
        setPath(parts.slice(0,-2).join('/'));
        if (parts.length >= 3) {
            if (parts[parts.length - 3].startsWith("title")) {
                setIsTitle(true);
            }
        }
    }

    useEffect(() => {
        fetchTutorData();
    }, [path, isTitle]);

    useFocusEffect(
        useCallback(() => {
            setPath('tutors');
            setIsTitle(true);
            fetchTutorData();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Homepage />
            <ScrollView>
                {(() => {
                    if(path !== 'tutors') {
                        return <BackButton onPress={handleBack} />;
                    }
                })()}

                {(() => {
                    if(isTitle) {
                        return tutorsData.map((tutor) => (
                            <SubjectCard key={tutor.id} subject={tutor} onPress={handleSubjectPress} />
                        ));
                    } else {
                        return tutorsData.map((tutor) => (
                            <TutorCard key={tutor.id} tutor={tutor} onPress={handleTutorPress} />
                        ));
                    }
                })()}
            </ScrollView>
        </View>

    );
};

export default TutorMarket;

// <SubjectCard subject={{level:"check"}} onPress={(() => Alert.alert(`${isTitle}`, path))}/>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3"
    },

});