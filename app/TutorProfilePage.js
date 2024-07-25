import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import TutorProfileHeader from '../components/TutorProfileHeader';
import TutorQualifications from '../components/TutorQualifications';
import TutorExperience from '../components/TutorExperience';
import TutorReviews from '../components/TutorReviews';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const TutorProfilePage = () => {
    const router = useRoute();
    const { tutor } = router.params;
    const navigation = useNavigation();

    const handlePress = async() => {
            navigation.navigate('tutorReview', {tutor});
    }

    return (
        <ScrollView style={styles.container}>
            <TutorProfileHeader tutor={tutor} />
            <TutorQualifications qualifications={tutor.qualifications} />
            <TutorExperience experience={tutor.experience} />
            <TutorReviews reviews={tutor.reviews} />
            {/* Other necessary components */}
            <View style={{alignItems:'center', flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity
                    onPress={handlePress}
                    style={styles.review}>
                    <Text style={{fontSize: 17, color: 'black'}}>Leave a review</Text>
                </TouchableOpacity>
            </View>

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
