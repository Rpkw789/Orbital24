import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, Animated } from 'react-native';
import Modal from 'react-native-modal';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import { firestore, storage } from '../../firebaseConfig';
import { getDoc, doc, collection, getDocs, setDoc, addDoc, deleteDoc } from 'firebase/firestore';
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
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [isMoveInterfaceActive, setIsMoveInterfaceActive] = useState(false);
    const animation = useState(new Animated.Value(0))[0];
    const [selectedNote, setSelectedNote] = useState(null);
    const [allFolders, setAllFolders] = useState([]);

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

    const fetchAllFoldersData = async () => {
        try {
            const foldersDocsRef = collection(firestore, `users/${user.uid}/notes storage`);
            const foldersDocs = await getDocs(foldersDocsRef);
            const foldersData = foldersDocs.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAllFolders(foldersData);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    useEffect(() => {
        fetchFoldersData();
    }, [path, isTop]);

    useEffect(() => {
        fetchAllFoldersData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            setPath('notes storage');
            fetchUserData();
            fetchFoldersData();
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

    const handleCreateFolder = async () => {
        if (newFolderName.trim() === '') {
            Alert.alert('Error', 'Folder name cannot be empty.');
            return;
        }

        try {
            // Create a new folder
            const newFolderRef = await setDoc(doc(firestore, `users/${user.uid}/notes storage`, newFolderName), {
                isDoc: false,
                name: newFolderName,
                title: newFolderName,
            });

            // Move the selected note to the new folder
            await handleMovePress(selectedNote, { id: newFolderName });

            // Reset state
            setNewFolderName('');
            setIsCreatingFolder(false);
            setIsMoveInterfaceActive(false);
            fetchFoldersData();

            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();

            Alert.alert('Success', `Folder "${newFolderName}" created and note moved successfully!`);
        } catch (error) {
            console.error('Error creating folder and moving note:', error);
            Alert.alert('Error', 'Failed to create folder and move the note.');
        }
    };

    const handleMoveDocument = (note) => {
        const defaultPath = `notes storage`;
        let fileRemainPath = path.slice(defaultPath.length) + '/' + note.id;
        if (fileRemainPath[0] == '/') {
            fileRemainPath = fileRemainPath.slice(1);
        }
        console.log('path:', path);
        console.log('fileRemainPath:', fileRemainPath);
        setSelectedNote({
            ...note,
            path: fileRemainPath
        }); // Set the selected note
        setIsMoveInterfaceActive(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleCancelMove = () => {
        setIsMoveInterfaceActive(false);
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleDeleteItem = async (item) => {
        try {
            if (item.isDoc) {
                const docRef = doc(firestore, `users/${user.uid}/notes storage/${item.id}`);
                await deleteDoc(docRef);
            }
            // Get a reference to the folder document
            const folderRef = doc(firestore, `users/${user.uid}/notes storage/${item.id}`);

            // Delete the folder
            await deleteDoc(folderRef);

            // Refresh the folders list
            fetchFoldersData();
            fetchAllFoldersData();

            Alert.alert('Success', `Item "${item.title}" deleted successfully!`);
        } catch (error) {
            console.error('Error deleting item:', error);
            Alert.alert('Error', 'Failed to delete the item.');
        }
    };

    const slideStyle = {
        transform: [
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -150]
                })
            }
        ]
    };

    const handleMovePress = async (note, folder) => {
        try {
            // Get a reference to the note's current document
            const oldDocRef = doc(firestore, `users/${user.uid}/notes storage/${note.path}`);

            console.log(`users/${user.uid}/notes storage/${note.path}`);
            // Fetch the note data
            const docSnap = await getDoc(oldDocRef);
            if (!docSnap.exists()) {
                console.error('Note does not exist');
                return;
            }

            // Get the note data
            const noteData = docSnap.data();

            // Get a reference to the new folder document
            const newCollectionRef = collection(firestore, `users/${user.uid}/notes storage/${folder.id}/${folder.id}`);

            // Add the note to the new folder's 'notes' collection
            await addDoc(newCollectionRef, {
                ...noteData,
                folderName: folder.id // Update folderId to the new folder
            });

            // Delete the note from the old location
            await deleteDoc(oldDocRef);

            // Optionally, refresh the folders
            fetchFoldersData();
            setIsMoveInterfaceActive(false);
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();

            Alert.alert('Success', 'Note moved successfully!');
        } catch (error) {
            console.error('Error moving note:', error);
            Alert.alert('Error', 'Failed to move the note.');
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

            <Animated.View style={[styles.noteContainer, slideStyle]}>
                {path !== 'notes storage' && <BackButton onPress={handleBack} />}
                {folders.map((note, index) => (
                    <View key={index} style={styles.docButton}>
                        <TouchableOpacity onPress={() => handlePress(note)} style={styles.folderButton}>
                            {note.isDoc ? (
                                <Icon name="filetext1" size={20} color="black" />
                            ) : (
                                <Icon name="folder1" size={20} color="black" />
                            )}
                            <Text style={styles.foldername}>
                                {note.title}
                            </Text>
                            <TouchableOpacity onPress={() => handleDeleteItem(note)} style={styles.moveButton}>
                                <Icon name="delete" size={20} color="black" />
                            </TouchableOpacity>
                            {note.isDoc ? (

                                <TouchableOpacity onPress={() => handleMoveDocument(note)} style={styles.moveButton}>
                                    <Icon name="addfolder" size={20} color="black" />
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.iconContainer}>
                                    <Icon name="right" size={20} color="black" />
                                </View>
                            )}
                        </TouchableOpacity>

                    </View>
                ))}
            </Animated.View>
            {isMoveInterfaceActive && (
                <View style={styles.moveInterface}>
                        <TouchableOpacity onPress={handleCancelMove} style={styles.cancelMoveButton}>
                            <Text>Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.moveText}>Move to:</Text>
                        {allFolders.map((folder, index) => (
                            !folder.isDoc && folder.id !== selectedNote.folderName && ( // Filter out documents and the folder itself
                                <TouchableOpacity
                                    key={index}
                                    style={styles.moveFolderButton}
                                    onPress={() => handleMovePress(selectedNote, folder)}>
                                    <Text style={styles.foldername}>{folder.title}</Text>
                                </TouchableOpacity>
                            )
                        ))}
                        <TouchableOpacity
                            onPress={() => setIsCreatingFolder(true)}
                            style={styles.moveFolderButton}>
                            <Text style={styles.foldername}>New folder</Text>
                        </TouchableOpacity>

                        {isCreatingFolder && (
                            <View style={styles.createFolderContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Folder name"
                                    value={newFolderName}
                                    onChangeText={setNewFolderName}
                                />
                                <TouchableOpacity onPress={handleCreateFolder} style={styles.createButton}>
                                    <Text style={styles.createButtonText}>Create and Move</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                </View>
            )}
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
        marginTop: 10
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
    editprofilebutton: {
        alignItems: "flex-end", // Aligns the Edit Profile button to the right
        backgroundColor: "#F5CAC2",
        paddingTop: 5,
        paddingRight: 10
    },
    foldername: {
        fontSize: 15,
        flex: 1, // Ensures text takes remaining space before icon
        marginLeft: 3
    },
    iconContainer: {
        flex: 0, // Ensures the icon container does not grow and stays fixed
        marginLeft: 'auto' // Moves the icon container to the far right
    },
    edit: {
        alignSelf: 'flex-end',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#ff5c5c',
    },
    buttonCreate: {
        backgroundColor: '#86A49C',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noteContainer: {
        flex: 1,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    },
    moveButton: {
        marginLeft: 'auto',
        padding: 10,
        backgroundColor: '#F5CAC2',
        borderRadius: 5,
        marginLeft: 5
    },
    deleteButton: {
        padding: 10,
        backgroundColor: '#FF6F6F',
        borderRadius: 5,
    },
    iconContainer: {
        marginLeft: 'auto',
    },
    moveInterface: {
        position: 'absolute',
        right: 0,
        backgroundColor: '#86A49C',
        padding: 20,
        top: 200,
        width: '40%',
    },
    cancelMoveButton: {
        marginBottom: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 20
    },
    moveText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    moveFolderButton: {
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    createFolderContainer: {
        marginTop: 10,
    },
    createButton: {
        backgroundColor: '#86A49C',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    folderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
});

export default ProfilePage;
