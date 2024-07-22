import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { firestore } from '../firebaseConfig';
import { getDocs, collection } from '@firebase/firestore';
import { AppContext } from '../context/userContext';
import { useNavigation } from 'expo-router';
import { Checkbox } from 'react-native-paper';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const { user } = useContext(AppContext);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartDocsRef = collection(firestore, `users/${user.uid}/cart`);
                const cartDocs = await getDocs(cartDocsRef);
                const items = cartDocs.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCartItems(items);
            } catch (e) {
                console.error('Error fetching cart items:', e);
            }
        };

        fetchCartItems();
    }, [user.uid]);

    const handleSelectAll = () => {
        setSelectedItems(cartItems.map(item => item.id));
    };

    const handlePurchase = () => {
        if (selectedItems.length === 0) {
            Alert.alert('No items selected', 'Please select items to purchase.');
            return;
        }
        // Handle the purchase logic here
        Alert.alert('Purchase', `Purchased items: ${selectedItems.join(', ')}`);
    };

    const handleCheckboxPress = (item) => {
        if (selectedItems.includes(item.id)) {
            setSelectedItems(selectedItems.filter(id => id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item.id]);
        }
    };

    const handleItemPress = (note) => {
        const isAdded = true;
        navigation.navigate('NotesDetails', { note, isAdded});
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {cartItems.map(item => (
                    <View key={item.id} style={styles.cartItem}>
                        <Checkbox
                            status={selectedItems.includes(item.id) ? 'checked' : 'unchecked'}
                            onPress={() => handleCheckboxPress(item)}
                        />
                        <TouchableOpacity style={styles.itemDetails} onPress={() => handleItemPress(item)}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.details}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.author}>Author: {item.author}</Text>
                                <Text style={styles.price}>Price: ${item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleSelectAll} style={styles.button}>
                    <Text style={styles.buttonText}>Select All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePurchase} style={styles.button}>
                    <Text style={styles.buttonText}>Purchase</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ShoppingCart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9EDE3',
        padding: 10,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    itemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    details: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    author: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    price: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
