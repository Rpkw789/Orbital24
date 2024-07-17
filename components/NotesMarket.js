import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { firestore } from '../firebaseConfig';
import { getDocs, collection } from '@firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation

const NotesMarket = () => {
    const [notesData, setNotesData] = useState([]);
    const navigation = useNavigation(); // Use useNavigation hook

    const fetchNotesData = async () => {
        try {
            const notesDocsRef = collection(firestore, 'notes');
            const notesDocs = await getDocs(notesDocsRef);
            const notes = notesDocs.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotesData(notes);
        } catch (e) {
            console.error('Error fetching notes collection:', e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchNotesData();
        }, [])
    );


    const renderNote = (note) => (
        <TouchableOpacity style={styles.placeholder} onPress={() => navigation.navigate('NotesDetails', { note })}>
            <Image source={{ uri: note.image }} style={styles.pic} />
            <Text style={styles.title}>{note.name}</Text>
            <Text style={styles.price}>{note.price}</Text>
            <Text style={styles.author}>{note.author}</Text>
        </TouchableOpacity>
    );

    const renderRow = (note1, note2) => (
        <View style={styles.bytwo}>
            {renderNote(note1)}
            {renderNote(note2)}
        </View>
    );

    return (
        <ScrollView>
            {notesData.map((note, index) => (
                index % 2 === 0 && notesData[index + 1] ? (
                    <View style={styles.lowercontainer} key={note.id}>
                        {renderRow(note, notesData[index + 1])}
                    </View>
                ) : null
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    lowercontainer: {
        padding: 10,
    },
    bytwo: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    placeholder: {
        width: '48%',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff', // Ensure there's a background color for shadow to be visible
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
    },
    pic: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        paddingLeft: 5,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#86A49C',
        marginBottom: 5,
        paddingLeft: 5,
    },
    author: {
        fontSize: 14,
        paddingLeft: 5,
    },
});

export default NotesMarket;
