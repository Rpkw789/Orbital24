import React from 'react';
import { View, StyleSheet } from 'react-native';
import TutorProfileHeader from '../components/TutorProfileHeader';
import TutorQualifications from '../components/TutorQualifications';
import TutorExperience from '../components/TutorExperience';
import TutorReviews from '../components/TutorReviews';
import { useRoute } from '@react-navigation/native';

const TutorProfilePage = () => {
    const route = useRoute();
    const { tutor } = route.params;

    return (
        <View style={styles.container}>
            <TutorProfileHeader tutor={tutor} />
            <TutorQualifications qualifications={tutor.qualifications} />
            <TutorExperience experience={tutor.experience} />
            <TutorReviews reviews={tutor.reviews} />
            {/* Other necessary components */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});

export default TutorProfilePage;
