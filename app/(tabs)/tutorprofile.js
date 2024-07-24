import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useState, useCallback, useContext } from 'react';
import { firestore, storage } from '../../firebaseConfig';
import { getDoc, doc, collection } from 'firebase/firestore';
import { getPdfImage, getPdfsDownloadURLs } from '../../functions/storage';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../context/userContext';
import { Alert } from 'react-native';

const ProfilePage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    //const [notes, setNotes] = useState([]);
    const { user } = useContext(AppContext);

    /*const fetchUserData = async () => {
        try {
            const userDocRef = doc(collection(firestore, 'tutors'), `${user.uid}`);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserData(userData);
            } else {
                // TO-DO: Handle case where user document doesn't exist
            }
        } catch (error) {
            console.error('Error fetching user document:', error);
        }
    };

    /*const fetchNotesData = async () => {
        try {
            const folderPath = 'gs://edusell-460f4.appspot.com/Users/ranen/notes';
            const urls = await getPdfsDownloadURLs(folderPath);
            setNotes(urls);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
            fetchNotesData();
        }, [])
    );*/

    return (
        <ScrollView style={styles.container}>
            <View style={styles.editprofilebutton}>
                <TouchableOpacity onPress={() => router.push("../editprofile")} style={styles.edit}>
                    <Text style={{ color: "#86A49C", textDecorationLine: 'underline', fontSize: 15 }}>
                        Edit Profile
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.Avatarcontainer}>
                <View style={styles.profilepic}>
                    <Image
                        source={require('@/assets/images/partial-react-logo.png')}
                        style={styles.avatarimage}
                    />
                </View>
                <View style={styles.userinfo}>
                    <Text style={styles.usertext}>Name: marsh</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.description}>5</Text>
                        <Icon name="star" color="#F7BE61" size={20} marginLeft={5} />
                    </View>
                </View>
            </View>
            <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 10, marginBottom: 6 }}>
                Biography:
            </Text>
            <ScrollView style={styles.scrollContainer}>
                <View style={{padding: 10}}>
                    <Text style={styles.smalltext}>Qualifications</Text>
                    <Text style={styles.description}>As clever as patricks rock</Text>
                    <Text style={styles.smalltext}>Experience</Text>
                    <Text style={styles.description}>certified bug catcher and cute temptress</Text>
                    <Text style={styles.smalltext}>Reviews</Text>
                    <View style={styles.reviews}>
                        <Text style={{fontSize: 16}}>
                        cutest cat ever like my guy thinks hes a tiger, some sort of beastly predator but hes actually just a cute ball of fur omg
                        </Text>
                    </View>
                    <View style={styles.reviews}>
                        <Text style={{fontSize: 16}}>
                        randomly pick from database
                        </Text>
                    </View>
                    <View style={styles.reviews}>
                        <Text style={{fontSize: 16}}>
                        cutest cat ever like my guy thinks hes a tiger, some sort of beastly predator but hes actually just a cute ball of fur omg
                        </Text>
                    </View>
                    <Text style={styles.smalltext}>
                        Products
                    </Text>
                    <View>
                        
                    </View>
                </View>
                <Button title='hello' onPress={() => console.log(user)}/>
            </ScrollView>

        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3",
    },
    scrollContainer: {
        flex: 1,
    },
    Avatarcontainer: {
        backgroundColor: "#F5CAC2",
        flexDirection: 'row',
        height: 130,
        paddingHorizontal: 20,
        alignContent: "center"
    },
    profilepic: {
        alignItems: 'center',
        width: 100
    },
    avatarimage: {
        borderRadius: 60,
        height: 100,
        width: 100,
        marginTop: 13
    },
    usertext: {
        fontSize: 20,
    },
    userinfo: {
        alignItems: 'left',
        paddingLeft: 20,
        marginTop: 30,
    },
    button: {
        backgroundColor: "#FFE2B7",
        padding: 10,
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: "center"
    },
    editprofilebutton: {
        alignItems: "flex-end", // Aligns the Edit Profile button to the right
        backgroundColor: "#F5CAC2",
        paddingTop: 5,
        paddingRight: 10
    },
    iconContainer: {
        flex: 0, // Ensures the icon container does not grow and stays fixed
        marginLeft: 'auto' // Moves the icon container to the far right
    },
    edit: {
        alignSelf: 'flex-end',
    },
    smalltext: {
        color: '#86A49C',
        marginBottom: 5,
        fontWeight: "bold",
        fontSize: 18
    },
    description: {
        fontSize: 17,
        marginBottom: 10
    },
    reviews: {
        backgroundColor: "#fff",
        width: '98%',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        padding: 5,
        borderRadius: 7,
        marginBottom: 10
    }
});

export default ProfilePage;
