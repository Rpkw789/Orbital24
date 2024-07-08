import React, { useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { app } from '../firebaseConfig'

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingLeft: 10,
    },
})

export default function SignUpScreen({ }) {

    const router = useRouter();

    const auth = getAuth(app);

    const [values, setValues] = useState({
        name: "",
        role: "",
        email: "",
        pwd: "",
        pwd2: ""
    })

    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    function handleRoleChange(role) {
        setValues(prev => ({
            ...prev,
            role: role
        }));
    }

    function SignUp() {

        const { email, pwd, pwd2, name, role } = values

        if (pwd == pwd2) {
            createUserWithEmailAndPassword(auth, email, pwd)
                .then(() => {
                    //firestore().collection('users').doc("users").add({type: role});
                    router.push("/(tabs)/NotesMarket");
                })
                .catch((error) => {
                    alert(error.message)
                    // ..
                });
        } else {
            alert("Passwords are different!")
        }
    }

    return <View style={styles.view}>
        <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>Sign Up</Text>
        <TextBox placeholder="Full Name" onChangeText={text => handleChange(text, "name")} />
        <TextBox placeholder="Email Address" onChangeText={text => handleChange(text, "email")} />
        <Picker
            selectedValue={values.role}
            onValueChange={(itemValue, itemIndex) => handleRoleChange(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Teacher" value="teacher" />
        </Picker>
        <TextBox placeholder="Password" secureTextEntry={true} onChangeText={text => handleChange(text, "pwd")} />
        <TextBox placeholder="Confirm Password" secureTextEntry={true} onChangeText={text => handleChange(text, "pwd2")} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
            <Btn onClick={() => SignUp()} title="Sign Up" style={{ width: "48%" }} />
            <Btn onClick={() => router.push("login")} title="Login" style={{ width: "48%", backgroundColor: "#344869" }} />
        </View>
    </View>
}