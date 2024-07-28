import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { firestore } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AppContext } from '../context/userContext';
import { useNavigation } from '@react-navigation/native';


const NotesDetails = () => {
    const route = useRoute();
    const { note, isAdded } = route.params;
    const { user } = useContext(AppContext);
    const navigation = useNavigation();

    const addToCart = async () => {
        try {
            const { uid } = user;
            const cartItemRef = doc(firestore, `users/${uid}/cart`, note.id);
            await setDoc(cartItemRef, {
                name: note.name,
                price: note.price,
                image: note.image,
                author: note.author,
                description: note.description,
                reviews: note.reviews,
                document: note.document
            });
            Alert.alert("Item added to cart");
        } catch (error) {
            Alert.alert("Error adding to cart: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Image source={{ uri: note.image }} style={styles.pic} />
                <View style={styles.content}>
                    <Text style={styles.title}>{note.name}</Text>
                    <Text style={{ fontSize: 27, marginBottom: 10 }}>{note.price}</Text>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Details</Text>
                    <Text style={styles.smalltext}>Listed by</Text>
                    <Text style={styles.description}>{note.author}</Text>
                    <Text style={styles.smalltext}>Description</Text>
                    <Text style={styles.description}>{note.description}</Text>
                    <Text style={styles.smalltext}>Reviews</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.description}>{note.reviews}</Text>
                        <Icon name="star" color="#F7BE61" size={20} marginLeft={5} />
                    </View>


                </View>
                <View style={styles.contentSpacer} />
            </ScrollView>
            <View style={styles.buttonsContainer}>
                {(() => {
                    if (isAdded) {
                        return;
                    } else {
                        return <TouchableOpacity style={styles.button} onPress={addToCart}>
                            <Text style={styles.buttonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    }
                })()}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('noteReview', {note})}>
                    <Text style={styles.buttonText}>Leave a Review</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3",
    },
    scrollContainer: {
        flex: 1,
    },
    pic: {
        width: '100%',
        height: 400,
        marginBottom: 10,
    },
    content: {
        padding: 20,
    },
    contentSpacer: {
        height: 100, // Adjust as needed to push content above buttons
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    smalltext: {
        color: '#86A49C',
        marginBottom: 5,
        fontWeight: "bold"
    },
    description: {
        fontSize: 17,
        marginBottom: 10
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff', // Ensure contrast with the background
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        height: 90,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 7,
        backgroundColor: "#F48584",
        height: 50,
        justifyContent: "center"
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 17
    },
});

export default NotesDetails;
