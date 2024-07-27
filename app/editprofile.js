import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import Btn from "../components/Btn";
import { useRouter } from 'expo-router';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
import { firestore, storage } from '../firebaseConfig';
import { AppContext } from '../context/userContext';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditProfilePage = () => {
    const router = useRouter();
    const [initialPic, setInitialPic] = useState('');
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [email, setEmail] = useState(null);
    const [school, setSchool] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageWhole, setProfileImageWhole] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { user, setUser } = useContext(AppContext);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(collection(firestore, 'users'), `${user.uid}`);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setName(userData.name);
                    setAge(userData.age);
                    setEmail(userData.email);
                    setSchool(userData.school);
                    setProfileImage(userData.profilepic);
                    setInitialPic(userData.profilepic);
                } else {
                    Alert.alert('Error', 'Unable to find document in database')
                }
            } catch (error) {
                console.error('Error adding user document:', error);
            }
        };
        fetchUserData();
    }, [firestore]);

    const handleSaveChanges = async () => {
        if (initialPic != profileImage) {
            const response = await fetch(profileImageWhole.uri);
            const blob = await response.blob();
            const storageRef = ref(storage, `Users/profilepic`);

            await uploadBytes(storageRef, blob).then(async (snapshot) => {
                console.log('Uploaded a blob or file!', snapshot);

                const downloadURL = await getDownloadURL(snapshot.ref);

                const userDocRef = doc(collection(firestore, 'users'), `${user.uid}`);
                await setDoc(userDocRef, {
                    name: name,
                    age: age,
                    email: email,
                    school: school,
                    profilepic: downloadURL // Save profileImage URL to Firestore
                }, { merge: true });

                Alert.alert('Success', 'Profile saved!');
                router.push("./profile");
            });
        } else {
            Alert.alert('Error', 'Please fill up all the details and upload the Files first.');
        }
    };

    const handleImagePicker = async (option) => {
        // No permissions request is necessary for launching the image library
        let result;
        if (option === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        }

        if (result.assets) {
            const image = result.assets[0];
            setProfileImageWhole(image);
            setProfileImage(image.uri);
            setIsModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>
            <View style={styles.profileImageContainer}>
                {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
                <TouchableOpacity style={styles.editButton} onPress={() => setIsModalVisible(true)}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="School"
                value={school}
                onChangeText={setSchool}
                keyboardType="default"
            />
            <Btn
                onClick={handleSaveChanges}
                title="Save Changes"
                style={styles.saveButton}
            />
            <TouchableOpacity onPress={() => router.push("./profile")} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleImagePicker('camera')}>
                            <Text style={styles.modalButtonText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleImagePicker('gallery')}>
                            <Text style={styles.modalButtonText}>Choose from Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 15,
        backgroundColor: '#344869',
        padding: 5,
        borderRadius: 15,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    saveButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#344869',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    cancelButton: {
        marginTop: 10
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#344869',
        textDecorationLine: 'underline'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#344869',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default EditProfilePage;
