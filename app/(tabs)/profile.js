import React, { useState, useCallback, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import { firestore, storage } from '../../firebaseConfig';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../context/userContext';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const ProfilePage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [folders, setFolders] = useState([]);
    const { user } = useContext(AppContext);

    const fetchUserData = async () => {
        try {
            const userDocRef = doc(collection(firestore, 'users'), `${user.uid}`);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserData(userData);
            } else {
                console.error('User document does not exist');
            }
        } catch (error) {
            console.error('Error fetching user document:', error);
        }
    };

    const fetchFoldersData = async () => {
        try {
            const foldersDocsRef = collection(firestore, `users/${user.uid}/notes storage`);
            const foldersDocs = await getDocs(foldersDocsRef);
            const foldersData = foldersDocs.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFolders(foldersData);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
            fetchFoldersData();
        }, [])
    );

    const handleDownload = async (note) => {
        try {
            const storageRef = ref(storage, note.document);
            const downloadURL = await getDownloadURL(storageRef);

            // Define a local file path
            const localFileUri = FileSystem.documentDirectory + note.title + (note.document.endsWith('.pdf') ? '.pdf' : '.docx');

            // Download the file
            const { uri } = await FileSystem.downloadAsync(downloadURL, localFileUri);

            // Share the file
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);
            } else {
                Alert.alert('Error', 'Sharing is not available on this device.');
            }
        } catch (error) {
            console.error('Error downloading or opening the file:', error);
            Alert.alert('Error', 'Failed to download or open the file.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.editprofilebutton}>
                <TouchableOpacity onPress={() => router.push("../editprofile")} style={styles.edit}>
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
                    <Text style={styles.usertext}>School: {userData ? userData.school : 'Loading...'}</Text>
                </View>
            </View>
            <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 10, marginBottom: 20 }}>
                My notes
            </Text>
            <View>
                {folders.map((note, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={() => handleDownload(note)}
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
