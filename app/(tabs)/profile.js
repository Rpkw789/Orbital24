import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import Modal from 'react-native-modal';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import { firestore, storage } from '../../firebaseConfig';
import { getDoc, doc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../context/userContext';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import BackButton from '../../components/BackTutorFolder';

const ProfilePage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [folders, setFolders] = useState([]);
    const { user } = useContext(AppContext);
    const [path, setPath] = useState('notes storage');
    const [isTop, setIsTop] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [destinationFolder, setDestinationFolder] = useState('');

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
            const foldersDocsRef = collection(firestore, `users/${user.uid}/${path}`);
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

    useEffect(() => {
        fetchFoldersData();
    }, [path, isTop]);

    useFocusEffect(
        useCallback(() => {
            setPath('notes storage');
            fetchUserData();
        }, [])
    );

    const handleBack = () => {
        const parts = path.split('/')
        setPath(parts.slice(0, -2).join('/'));
        if (parts.length == 3) {
            setIsTop(true);
        }
    }

    const handlePress = async (note) => {
        if (note.isDoc) {
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
        } else {
            setPath(`${path}/${note.id}/${note.id}`);
            setIsTop(false);
        }
    };

    const handleMoveDocument = (note) => {
        setCurrentNote(note);
        setModalVisible(true);
    };

    const moveDocument = async () => {
        if (destinationFolder) {
            try {
                const docRef = doc(firestore, `users/${user.uid}/${path}/${currentNote.id}/${currentNote.id}`);
                await updateDoc(docRef, {
                    path: destinationFolder
                });
                fetchFoldersData();
                setModalVisible(false);
                setDestinationFolder('');
            } catch (error) {
                console.error('Error moving document:', error);
                Alert.alert('Error', 'Failed to move document.');
            }
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
                    {(() => {
                        if (userData) {
                            return <Image
                            source={{ uri: userData.profilepic }}
                            style={styles.avatarimage}
                        />
                        }
                    })()}
                </View>
                <View style={styles.userinfo}>
                    <Text style={styles.usertext}>Name: {userData ? userData.name : 'Loading...'}</Text>
                    <Text style={styles.usertext}>School: {userData ? userData.school : 'Loading...'}</Text>
                </View>
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>My notes</Text>
            </View>
            <View>
                {path !== 'notes storage' && <BackButton onPress={handleBack} />}
                {folders.map((note, index) => (
                    <TouchableOpacity
                        key={index}
                        style={note.isDoc ? styles.docButton : styles.folderButton}
                        onPress={() => handlePress(note)}
                    >
                        <Text style={styles.foldername}>
                            {note.title}
                        </Text>
                        {note.isDoc ? (
                            <TouchableOpacity onPress={() => handleMoveDocument(note)} style={styles.moveButton}>
                                <Icon name="folder1" size={20} color="white" />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.iconContainer}>
                                <Icon name="right" size={20} color="black" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Move Document</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter destination folder path"
                        value={destinationFolder}
                        onChangeText={setDestinationFolder}
                    />
                    <Button title="Move" onPress={moveDocument} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </ScrollView>
    );
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        flex: 1,
    },
    docButton: {
        backgroundColor: "#FFE2B7",
        padding: 10,
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: "center"
    },
    folderButton: {
        backgroundColor: "#86A49C",
        padding: 10,
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: "center"
    },
    moveButton: {
        marginLeft: 10,
        backgroundColor: '#86A49C',
        borderRadius: 20,
        padding: 10,
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
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    }
});

export default ProfilePage;
