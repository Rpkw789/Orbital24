import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AnimatedTabSlider from './Tabs';

const Homepage = () => {
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [chatCount, setChatCount] = useState(0);

    return (
       
            <View style={styles.topdiv}>
                <View style={styles.div1}>
                    <TextInput placeholder='Search...' clearButtonMode='always' style={styles.searchbar} />

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => { /* Implement onPress functionality */ }}>
                            <Icon name="shoppingcart" size={36} color="black" />
                            {cartItemsCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{cartItemsCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => { /* Implement onPress functionality */ }}>
                            <Icon name="message1" size={30} color="black" />
                            {chatCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{chatCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.div2}>
                    <Text style ={{fontSize: 18, color:"black", marginTop: 20}}>
                        Browse for
                    </Text>
                    <AnimatedTabSlider/>
                </View>
            </View>
   
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3"
    },
    topdiv: {
        height: 200,
        backgroundColor: "#F5CAC2",
        paddingTop: 20,
        paddingHorizontal: 10
    },
    searchbar: {
        flex: 1,
        borderColor: "#86A49C",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: 20,
        
    },
    div1: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonsContainer: {
        flexDirection: "row",
        marginLeft: 5, // Pushes buttons to the end of the div1 container
    },
    button: {
        alignItems: "center",
        paddingHorizontal: 5,
        justifyContent: "center",
        flexDirection: "row",
        marginLeft: 5, // Adjust as needed for spacing between buttons
    },
    badge: {
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginLeft: 6,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default Homepage;