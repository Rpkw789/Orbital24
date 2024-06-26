import React, { useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import {getAuth, signInWithEmailAndPassword} from '@firebase/auth';
import { useRouter } from 'expo-router';
import { app } from '../firebaseConfig';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9EDE3"
    }
})

export default function Loginscreen({ }) {

    const router = useRouter();

    const auth = getAuth(app);

    const [values, setValues] = useState({
        email: "",
        pwd: ""
    })

    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    function Login() {

        const { email, pwd } = values

        signInWithEmailAndPassword(auth, email, pwd)
            .then(() => { router.push("/(tabs)/NotesMarket");
            })
            .catch((error) => {
                alert(error.message)
                // ..
            });
    }

    return <View style={styles.view}>
        <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>Login</Text>
        <TextBox placeholder="Email Address" onChangeText={text => handleChange(text, "email")} />
        <TextBox placeholder="Password" onChangeText={text => handleChange(text, "pwd")} secureTextEntry={true} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
            <Btn onClick={() => Login()} title="Login" style={{ width: "48%" , backgroundColor: "#F5CAC2"}} />
            <Btn onClick={() => router.push("signup")} title="Sign Up" style={{ width: "48%", backgroundColor: "#F48584" }} />
        </View>
    </View>
}