import { View, Text } from "react-native";
import React, { useState, useCallback, useContext } from 'react';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { AppContext } from "../context/userContext";
import { StyleSheet } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { firestore } from "../firebaseConfig";
import Icon from 'react-native-vector-icons/AntDesign';

const Review = () => {

    const [reviewData, setReviewData] = useState([]);
    const { user } = useContext(AppContext);

    const fetchUserData = async () => {
        try {
            const reviewsDocsRef = collection(firestore, `users/${user.uid}/reviews`);
            const reviewsDocs = await getDocs(reviewsDocsRef);
            const reviews = reviewsDocs.docs.map(rDoc => ({
                id: rDoc.id,
                ...rDoc.data()
            }));
            setReviewData(reviews);
        } catch (error) {
            console.error('Error fetching user document:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [])
    );

    return (
        <View>
            {reviewData.map((review) => (
                <View key={review.id} style={styles.reviews}>
                    <Text style={{ fontSize: 16 }}>
                        {review.review}
                    </Text>
                    <Text> </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.description}>{review.rating}</Text>
                        <Icon name="star" color="#F7BE61" size={20} marginLeft={5} />
                    </View>
                </View>
            ))}
        </View>
    )
}

export default Review;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3",
    },
    scrollContainer: {
        flex: 1,
    },
    Avatarcontainer: {
        backgroundColor: "#F5CAC2",
        flexDirection: 'row',
        height: 130,
        paddingHorizontal: 20,
        alignContent: "center"
    },
    profilepic: {
        alignItems: 'center',
        width: 100
    },
    avatarimage: {
        borderRadius: 60,
        height: 100,
        width: 100,
        marginTop: 13
    },
    usertext: {
        fontSize: 20,
    },
    userinfo: {
        alignItems: 'left',
        paddingLeft: 20,
        marginTop: 30,
    },
    button: {
        backgroundColor: "#FFE2B7",
        padding: 10,
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: "center"
    },
    editprofilebutton: {
        alignItems: "flex-end", // Aligns the Edit Profile button to the right
        backgroundColor: "#F5CAC2",
        paddingTop: 5,
        paddingRight: 10
    },
    iconContainer: {
        flex: 0, // Ensures the icon container does not grow and stays fixed
        marginLeft: 'auto' // Moves the icon container to the far right
    },
    edit: {
        alignSelf: 'flex-end',
    },
    smalltext: {
        color: '#86A49C',
        marginBottom: 5,
        fontWeight: "bold",
        fontSize: 18
    },
    description: {
        fontSize: 17,
        marginBottom: 10
    },
    reviews: {
        backgroundColor: "#fff",
        width: '98%',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        padding: 5,
        borderRadius: 7,
        marginBottom: 10
    }
});