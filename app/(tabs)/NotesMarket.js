import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import Homepage from '../../components/homepage';

const NotesMarket = () => {
    return (
        <ScrollView style={styles.container}>
            <Homepage/>

            <View style={styles.lowercontainer}>
                <View style={styles.bytwo}>
                    <View style={styles.placeholder}>
                        <Image source={require('@/assets/images/bunny.png')} style={styles.pic} />
                        <Text style={styles.title}>
                            Sec 2 Bio IP notes
                        </Text>
                        <Text style={styles.price}>
                            $3.90
                        </Text>
                        <Text style={styles.author}>
                            Alissa Tay
                        </Text>
                    </View>
                    <View style={styles.placeholder}>
                        <Image source={require('@/assets/images/j1.png')} style={styles.pic} />
                        <Text style={styles.title}>
                            A level Pure Mathematics
                        </Text>
                        <Text style={styles.price}>
                            $5
                        </Text>
                        <Text style={styles.author}>
                            Mr. Poh
                        </Text>
                    </View>
                </View>

                <View style={styles.bytwo}>
                    <View style={styles.placeholder}>
                        <Image source={require('@/assets/images/hist.png')} style={styles.pic} />
                        <Text style={styles.title}>
                            GCE O level Upper Sec History 
                        </Text>
                        <Text style={styles.price}>
                            $10.40
                        </Text>
                        <Text style={styles.author}>
                            Melissa
                        </Text>
                    </View>
                    <View style={styles.placeholder}>
                        <Image source={require('@/assets/images/prisch.png')} style={styles.pic} />
                        <Text style={styles.title}>
                            P3 & 4 Science
                        </Text>
                        <Text style={styles.price}>
                            $7
                        </Text>
                        <Text style={styles.author}>
                            Science ShiFu
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3"
    },
  
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
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