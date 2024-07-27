import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { firestore, storage } from '../firebaseConfig';
import * as DocumentPicker from 'expo-document-picker';
import { useContext } from 'react';
import { AppContext } from '../context/userContext';
import { ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from '@firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

const UploadPage = ({setPage}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const { user } = useContext(AppContext);

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf"
        });

        const assets = result.assets;
        if (!assets) {
            return;
        }
        const fileResult = assets[0];
        setFile(fileResult);
        console.log(fileResult);
    };

    const pickPreviewImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: ["image/png", "image/jpeg"]
        });

        const assets = result.assets;
        if (!assets) {
            return;
        }
        const fileResult = assets[0];
        setPreviewImage(fileResult);
        console.log(fileResult);
    }

    const uploadDocument = async () => {
        if (file && previewImage) {
            const response = await fetch(file.uri);
            const blob = await response.blob();
            const storageRef = ref(storage, `Notes/${file.name}`);

            await uploadBytes(storageRef, blob).then(async (snapshot) => {
                console.log('Uploaded a blob or file!', snapshot);

                // Save the document details in Firestore
                await setDoc(doc(firestore, `users/${user.uid}/uploadedNotes`, file.name), {
                    name,
                    price,
                    author,
                    description,
                    uri: snapshot.metadata.fullPath,
                });

                Alert.alert('Success', 'Document uploaded successfully!');
            });
        } else {
            Alert.alert('Error', 'Please fill up all the details and upload the Files first.');
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Upload Notes</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Author"
                    value={author}
                    onChangeText={setAuthor}
                />
                <TextInput
                    style={[styles.input, styles.description]}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <TouchableOpacity style={styles.pickButton} onPress={pickPreviewImage}>
                    <Ionicons name="document-outline" size={24} color="white" />
                    <Text style={styles.pickButtonText}>Pick Preview Image</Text>
                </TouchableOpacity>
                {previewImage && (
                    <>
                        <Text style={styles.fileName}>Selected file: {previewImage.name}</Text>
                        <Image source={{ uri: previewImage.uri }} style={styles.imagePreview} />
                    </>
                )}
                <TouchableOpacity style={styles.pickButton} onPress={pickDocument}>
                    <Ionicons name="document-outline" size={24} color="white" />
                    <Text style={styles.pickButtonText}>Pick PDF</Text>
                </TouchableOpacity>
                {file && <Text style={styles.fileName}>Selected file: {file.name}</Text>}
                <TouchableOpacity style={styles.uploadButton} onPress={uploadDocument}>
                    <Ionicons name="cloud-upload-outline" size={24} color="white" />
                    <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
                <Button title="Go Back" onPress={() => {setPage(0)}} />
            </View>
        </ScrollView>
    );
};

export default UploadPage;

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
    pickButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    pickButtonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
    },
    fileName: {
        textAlign: 'center',
        marginBottom: 15,
        color: '#666',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 10,
    },
    uploadButtonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
    },
});