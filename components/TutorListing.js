import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { firestore, storage } from '../firebaseConfig';
import { useContext } from 'react';
import { AppContext } from '../context/userContext';
import { ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc, collection, getDocs, addDoc, getDoc } from '@firebase/firestore';
import { ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Listing = ({ setPage }) => {
    const [rate, setRate] = useState(0);
    const [levelEdu, setLevelEdu] = useState('');
    const [generalSubject, setGeneralSubject] = useState('');
    const [specialisedSubject, setSpecialisedSubject] = useState('');
    const [description, setDescription] = useState('');
    const { user } = useContext(AppContext);
    const [userData, setUserData] = useState(null);

    const subjectsPrimary = [
        { label: 'Math', value: 1 },
        { label: 'Science', value: 2 },
        { label: 'Chinese', value: 3 },
        { label: 'English', value: 4 },
        { label: 'Malay', value: 5 },
        { label: 'Tamil', value: 6 }
    ];
    const subjectsSecondary = [
        { label: 'Math', value: 1 },
        { label: 'Biology', value: 2 },
        { label: 'Chemistry', value: 2 },
        { label: 'Physics', value: 2 },
        { label: 'Chinese', value: 3 },
        { label: 'English', value: 4 },
        { label: 'Malay', value: 5 },
        { label: 'Tamil', value: 6 },
        { label: 'History', value: 1 },
        { label: 'Geography', value: 2 },
        { label: 'Social Studies', value: 1 }
    ];
    const subjectsJunior = [
        { label: 'Math', value: 1 },
        { label: 'Biology', value: 2 },
        { label: 'Chemistry', value: 2 },
        { label: 'Physics', value: 2 },
        { label: 'Chinese', value: 3 },
        { label: 'English', value: 4 },
        { label: 'Malay', value: 5 },
        { label: 'Tamil', value: 6 },
        { label: 'History', value: 1 },
        { label: 'Geography', value: 2 },
    ];
    const level = [
        { label: 'Junior College', value: 'JuniorCollege' },
        { label: 'Primary', value: 'Primary' },
        { label: 'Secondary', value: 'Secondary' }
    ]

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

    useEffect(() => {
        fetchUserData();
    }, []);

    const uploadDocument = async () => {
        if (levelEdu != '' && generalSubject != '' && specialisedSubject != '' && description != '') {
            const path = `tutors/title${levelEdu}/title${levelEdu}/${generalSubject}/${generalSubject}`
            const docRef = await setDoc(doc(firestore, `users/${user.uid}/uploadedListing`, user.uid), {
                rate,
                description,
                subject: specialisedSubject,
                image: userData.profilepic,
                name: userData.name,
                path: path,
                level: userData.name,
                id: user.uid,
            });
            await setDoc(doc(firestore, path, user.uid), {
                rate,
                description,
                subject: specialisedSubject,
                image: userData.profilepic,
                name: userData.name,
                path: path,
                level: userData.name,
                id: user.uid,
            });

            Alert.alert('Success', 'Document uploaded successfully!');

        } else {
            Alert.alert('Error', 'Please fill up all the details and upload the Files first.');
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Create Listing</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rate"
                    value={rate}
                    onChangeText={setRate}
                    keyboardType="numeric"
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={levelEdu}
                        onValueChange={(itemValue, itemIndex) => setLevelEdu(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select a subject" value="" />
                        {level.map((subject, index) => (
                            <Picker.Item key={index} label={subject.label} value={subject.value} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={generalSubject}
                        onValueChange={(itemValue, itemIndex) => setGeneralSubject(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select a subject" value="" />
                        {(() => {
                            if (levelEdu != '') {
                                if (levelEdu == 'Primary') {
                                    return (subjectsPrimary.map((subject, index) => (
                                        <Picker.Item key={index} label={subject.label} value={subject.label} />
                                    )))
                                } else if (levelEdu == 'Secondary') {
                                    return (subjectsSecondary.map((subject, index) => (
                                        <Picker.Item key={index} label={subject.label} value={subject.label} />
                                    )))
                                } else if (levelEdu == 'JuniorCollege') {
                                    return (subjectsJunior.map((subject, index) => (
                                        <Picker.Item key={index} label={subject.label} value={subject.label} />
                                    )))
                                }
                            } else {
                                return
                            }
                        })()}
                    </Picker>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Specialised Subject"
                    value={specialisedSubject}
                    onChangeText={setSpecialisedSubject}
                />
                <TextInput
                    style={[styles.input, styles.description]}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <TouchableOpacity style={styles.uploadButton} onPress={uploadDocument}>
                    <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
                <Button title="Go Back" onPress={() => { setPage(0) }} />
            </View>
        </ScrollView>
    );
};

export default Listing;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9EDE3',
        justifyContent: 'center',
    },
    description: {
        height: 100,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    pickerContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    uploadButtonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
    },
});