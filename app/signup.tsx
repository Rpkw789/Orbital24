import React, { useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from '@firebase/auth';
import { initializeApp } from '@firebase/app';
import { useRouter } from 'expo-router';
import { getFirestore } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default function SignUpScreen({ }) {

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

    function SignUp() {

        const { email, pwd, pwd2, name, role } = values

        if (pwd == pwd2) {
            createUserWithEmailAndPassword(auth, email, pwd)
                .then(() => {
                    //firestore().collection('users').doc("users").add({type: role});
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
        <TextBox placeholder="Who are you? (Student or Teacher)" onChangeText={text => handleChange(text, "role")}/>
        <TextBox placeholder="Password" secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd")}/>
        <TextBox placeholder="Confirme Password" secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd2")}/>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
            <Btn onClick={() => SignUp()} title="Sign Up" style={{ width: "48%" }} />
            <Btn onClick={() => router.push("login")} title="Login" style={{ width: "48%", backgroundColor: "#344869" }} />
        </View>
    </View>
}