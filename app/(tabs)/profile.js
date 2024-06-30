import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Btn from "../../components/Btn"
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { firestore, storage } from '../../firebaseConfig';
import { getDoc, collection, doc } from 'firebase/firestore';
import { getPdfImage, getPdfsDownloadURLs } from '../../functions/storage';

const ProfilePage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(collection(firestore, 'users'), "ranen");
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserData(userData);
                } else {
                    // TO-DO: Handle case where user document doesn't exist
                }
            } catch (error) {
                console.error('Error fetching user document:', error);
            }
        };

        const fetchNotesData = async () => {
            try {
                const folderPath = 'gs://edusell-460f4.appspot.com/Users/ranen/notes';
                const urls = await getPdfsDownloadURLs(folderPath);
                setNotes(urls);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchUserData();
        fetchNotesData();
    }, [firestore]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.editprofilebutton}>
                <TouchableOpacity onPress={() => router.push("./editprofile")} style={styles.edit}>
                    <Text style={{ color: "#86A49C", textDecorationLine: 'underline', fontSize: 15 }}>
                        Edit Profile
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.Avatarcontainer}>
                <View style={styles.profilepic}>
                    <Image
                        source={require('@/assets/images/partial-react-logo.png')}
                        style={styles.avatarimage}
                    />
                </View>
                <View style={styles.userinfo}>
                    <Text style={styles.usertext}>Name: {userData ? userData.name : 'Loading...'}</Text>
                    <Text style={styles.usertext}>Age: {userData ? userData.age : 'Loading...'}</Text>
                    <Text style={styles.usertext}>School: {userData ? userData.school : 'Loading...'}</Text>
                </View>
            </View>
            <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 10, marginBottom: 20 }}>
                My notes
            </Text>
            <View>
                {/* Display notes dynamically */}
                {notes.map((note, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={() => {/* Implement onPress functionality */ }}
                    >
                        <Text style={styles.foldername}>
                            {note.title}
                        </Text>
                        <View style={styles.iconContainer}>
                            <Icon name="right" size={20} color="black"/>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3",
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
    foldername: {
        fontSize: 15,
        flex: 1 // Ensures text takes remaining space before icon
    },
    iconContainer: {
        flex: 0, // Ensures the icon container does not grow and stays fixed
        marginLeft: 'auto' // Moves the icon container to the far right
    },
    edit: {
        alignSelf: 'flex-end',
    }
});

export default ProfilePage;
