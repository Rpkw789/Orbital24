import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { firestore, storage } from '../../firebaseConfig';

const UploadPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [author, setAuthor] = useState('');
    const [file, setFile] = useState(null);

    /*
    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            setFile(res[0]);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                throw err;
            }
        }
    };

    const uploadFile = async () => {
        if (!file || !name || !price || !author) {
            Alert.alert('Please fill all fields and select a file.');
            return;
        }

        const uploadUri = file.uri;
        const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const storageRef = storage().ref(`pdfs/${filename}`);
        const task = storageRef.putFile(uploadUri);

        task.on('state_changed', snapshot => {
            console.log(snapshot.bytesTransferred / snapshot.totalBytes);
        });

        try {
            await task;
            const downloadURL = await storageRef.getDownloadURL();
            await firestore().collection('notes').add({
                name,
                price,
                author,
                fileURL: downloadURL,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });
            Alert.alert('File uploaded successfully');
            setName('');
            setPrice('');
            setAuthor('');
            setFile(null);
        } catch (error) {
            console.error('Error uploading file: ', error);
            Alert.alert('Error uploading file');
        }
    };
    */

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
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
            <Button title="Pick PDF" onPress={() => {}} />
            {file && <Text>Selected file: {file.name}</Text>}
            <Button title="Upload" onPress={() => {}} />
        </View>
    );
};

export default UploadPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9EDE3',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
});
