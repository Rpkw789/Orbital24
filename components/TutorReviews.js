import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const TutorReviews = ({ reviews }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reviews</Text>
            {/* Render reviews using map */}
            {reviews.map((review, index) => (
                <View key={index} style={styles.reviewContainer}>
                    <Text style={styles.reviewText}>{review.review}</Text>
                    <View style={styles.starContainer}>
                        {Array.from({ length: review.rating }).map((_, i) => (
                            <Icon key={i} name="star" color="#F7BE61" size={20} style={styles.starIcon} />
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reviewContainer: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    reviewText: {
        fontSize: 16,
    },
    starContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    starIcon: {
        marginRight: 5,
    },
    // Add more styles as needed
});

export default TutorReviews;

