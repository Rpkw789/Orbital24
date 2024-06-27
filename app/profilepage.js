import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Btn from "../components/Btn"
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';

const profilepage = () => {
    const router = useRouter();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.Avatarcontainer}>
                <View style={styles.profilepic}>
                    <Image
                        source={require('@/assets/images/partial-react-logo.png')}
                        style={styles.avatarimage}
                    />
                </View>
                <View style={styles.userinfo}>
                    <Text style={styles.usertext}>User1</Text>
                    <Text style={styles.usertext}>Age: 17</Text>
                    <Text style={styles.usertext}>School: ACJC</Text>
                </View>
                <View style={styles.editprofilebutton}>
                    <Btn onClick={() => router.push("./editprofilepage")} 
                    title="Edit profile" style={{ width: "100%", backgroundColor: "#344869" }} />
                </View>
            </View>
            <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 10, marginBottom: 20 }}>
                My notes
            </Text>
            <View>
                <TouchableOpacity style={styles.button} onPress={null}>
                    <View>
                        <Text style={styles.foldername}>
                            English
                        </Text>
                    </View>

                    <View style={{ length: 25 }}>
                        <Icon name="right" size={20} color="white" />
                    </View>


                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={null}>
                    <Text style={styles.foldername}>
                        math
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={null}>
                    <Text style={styles.foldername}>
                        chem
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3",

    },
    Avatarcontainer: {
        backgroundColor: "#F5CAC2",
        flexDirection: 'row',
        height: 200,
        padding: 20,
    },
    profilepic: {
        alignItems: 'centre'
    },
    avatarimage: {
        borderRadius: 60,
        height: 120,
        width: 120,
        marginTop: 20
    },
    usertext: {
        fontSize: 20,
        marginTop: 10,
    },
    userinfo: {
        alignItems: 'left',
        paddingLeft: 20,
        marginTop: 30,
    },
    button: {
        backgroundColor: "grey",
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 2
    },
    editprofilebutton: {
        alignContent: 'center',
        marginTop: 20
    },
    foldername: {
        paddingLeft: 10,
        fontSize: 15
    },

});

export default profilepage;