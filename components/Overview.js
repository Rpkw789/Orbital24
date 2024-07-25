import { View, Text } from "react-native";
import React, { useState, useCallback, useContext } from 'react';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { AppContext } from "../context/userContext";
import { StyleSheet } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { firestore } from "../firebaseConfig";

const Overviews = () => {

    const [userData, setUserData] = useState(null);
    const { user } = useContext(AppContext);

    const fetchUserData = async () => {
        try {
            const userDocRef = doc(collection(firestore, 'users'), `${user.uid}`);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userDocData = userDoc.data();
                setUserData(userDocData);
            } else {
                // TO-DO: Handle case where user document doesn't exist
            }
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
            <View style={{ padding: 10 }}>
                <Text style={styles.smalltext}>Biography: </Text>
                <Text style={styles.description}>{userData ? userData.description : ''} </Text>
                <Text style={styles.smalltext}>Qualifications</Text>
                <Text style={styles.description}>{userData ? userData.qualifications : ''}</Text>
                <Text style={styles.smalltext}>Experience</Text>
                <Text style={styles.description}>{userData ? userData.experience : ''}</Text>
            </View>
        </View>
    )
}

export default Overviews;

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