import { View, Text } from "react-native";
import React, { useState, useCallback, useContext } from 'react';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { AppContext } from "../context/userContext";
import { StyleSheet } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { firestore } from "../firebaseConfig";
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Products = () => {

    const [notesData, setNotesData] = useState([]);
    const { user } = useContext(AppContext);
    const navigation = useNavigation();

    const fetchNotesData = async () => {
        try {
            const notesDocsRef = collection(firestore, `users/${user.uid}/uploadedNotes`);
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

    const renderNote = (note) => (
        <TouchableOpacity style={styles.placeholder} onPress={() => navigation.navigate('NotesDetails', { note })} key={note.id}>
            <Image source={{ uri: note.image }} style={styles.pic} />
            <Text style={styles.title}>{note.name}</Text>
            <Text style={styles.price}>{note.price}</Text>
            <Text style={styles.author}>{note.author}</Text>
        </TouchableOpacity>
    );

    const renderRow = (note1, note2) => (
        <View style={styles.bytwo} key={note1.id}>
            {renderNote(note1)}
            {note2 && renderNote(note2)}
        </View>
    );

    useFocusEffect(
        useCallback(() => {
            fetchNotesData();
        }, [])
    );

    return (
        <View>
            {notesData.map((note, index) => (
                index % 2 === 0 && notesData[index + 1] ? (
                    <View style={styles.lowercontainer} key={note.id}>
                        {renderRow(note, notesData[index + 1])}
                    </View>
                ) : (index % 2 === 0 && notesData.length === index + 1) ? (
                    <View style={styles.lowercontainer} key={note.id}>
                        {renderRow(note, null)}
                    </View>
                ) : null
            ))}
        </View>
    )
}

export default Products;

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
        backgroundColor: '#fff',
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
