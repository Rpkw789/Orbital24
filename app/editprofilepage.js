import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Btn from "../components/Btn";
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

const EditProfilePage = ({ userData }) => {
    const router = useRouter();
    const [name, setName] = useState(userData.name);
    const [age, setAge] = useState(userData.age);
    const [email, setEmail] = useState(userData.email);

    const handleSaveChanges = async () => {
        try {
            const userRef = doc(firestore, 'users', userData.id); // Assuming userData.id is the document ID of the current user
            await setDoc(userRef, {
                name: name,
                age: age,
                email: email
                // Add any other fields you want to update
            }, { merge: true }); // Merge option ensures existing data is not overwritten completely

            router.push("./profilepage"); // Navigate back to the profile page after saving changes
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>
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
            <Btn
                onClick={handleSaveChanges}
                title="Save Changes"
                style={styles.saveButton}
            />
            <TouchableOpacity onPress={() => router.push("./profilepage")} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
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
    }
});

export default EditProfilePage;
