import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import TutorCard from './TutorCard';
import SubjectCard from './SubjectCard';
import BackButton from './BackTutorFolder';
import { firestore } from '../firebaseConfig';
import { getDocs, collection } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const TutorMarket = ({ searchQuery }) => {

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
        navigation.navigate('TutorDetails', { tutor });
    };

    const handleSubjectPress = (subject) => {
        setPath(`${path}/${subject.id}/${subject.id}`);
        if (subject.id.startsWith("title")) {
            setIsTitle(true);
        } else {
            setIsTitle(false);
        }
    }

    const handleBack = () => {
        const parts = path.split('/')
        setPath(parts.slice(0, -2).join('/'));
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

    // Filter tutorsData based on searchQuery
    const filteredTutors = tutorsData.filter(tutor => {
        const title = tutor.level.toLowerCase().replace(/\s+/g, ' ').trim();
        const query = searchQuery.toLowerCase().replace(/\s+/g, ' ').trim();
        return title.includes(query);
    });

    return (
        <ScrollView>
            {path !== 'tutors' && <BackButton onPress={handleBack}/>}

            {isTitle ? (
                filteredTutors.map((tutor) => (
                    <SubjectCard key={tutor.id} subject={tutor} onPress={handleSubjectPress} />
                ))
            ) : (
                filteredTutors.map((tutor) => (
                    <TutorCard key={tutor.id} tutor={tutor} onPress={handleTutorPress} />
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
});

export default TutorMarket;
