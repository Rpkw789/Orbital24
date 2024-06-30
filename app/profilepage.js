import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Btn from "../components/Btn"
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { firestore, storage } from '../firebaseConfig';
import { getDoc, collection, doc } from 'firebase/firestore';
import { getPdfImage, getPdfsDownloadURLs } from '../functions/storage';

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
                    //TO-DO
                }
            } catch (error) {
                console.error('Error adding user document:', error);
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
                <View style={styles.editprofilebutton}>
                    <Btn
                        onClick={() => router.push("./editprofilepage")}
                        title="Edit profile"
                        style={{ width: "100%", backgroundColor: "#344869" }}
                    />
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
                        onPress={() => {/* Implement onPress functionality */}}
                    >
                        <View>
                            <Text style={styles.foldername}>
                                {note.title}
                            </Text>
                        </View>
                        <View style={{ length: 25 }}>
                            <Icon name="right" size={20} color="white" />
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
        height: 200,
        padding: 20,
    },
    profilepic: {
        alignItems: 'center'
    },
    avatarimage: {
        borderRadius: 60,
        height: 120,
        width: 120,
        marginTop: 20
    },
    usertext: {
        fontSize: 20,
        marginTop: 10,
    },
    userinfo: {
        alignItems: 'left',
        paddingLeft: 20,
        marginTop: 30,
    },
    button: {
        backgroundColor: "grey",
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 2,
        marginBottom: 10,
    },
    editprofilebutton: {
        alignContent: 'center',
        marginTop: 20
    },
    foldername: {
        paddingLeft: 10,
        fontSize: 15
    },
});

export default ProfilePage;
