import React, { useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import { initializeApp } from '@firebase/app';
import "firebase/auth";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from '@firebase/auth';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default function Loginscreen({ navigation }) {

    const router = useRouter();

    const firebaseConfig = {
        apiKey: "AIzaSyBfKZPjYfyckkK_LurdYvgR3taj5ecxujM",
        authDomain: "edusell-460f4.firebaseapp.com",
        projectId: "edusell-460f4",
        storageBucket: "edusell-460f4.appspot.com",
        messagingSenderId: "530222344689",
        appId: "1:530222344689:web:2d11705c8e8a61d6a63c50",
        measurementId: "G-7H12H4S6GT"
      };
    
    const app = initializeApp(firebaseConfig);

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
            .then(() => { alert("done")
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
            <Btn onClick={() => Login()} title="Login" style={{ width: "48%" }} />
            <Btn onClick={() => router.push("signup")} title="Sign Up" style={{ width: "48%", backgroundColor: "#344869" }} />
        </View>
    </View>
}