import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { initializeApp } from '@firebase/app';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from '@firebase/auth';

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

export default function login({email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication}) {
    return(
        <ScrollView style = {styles.container}>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3"
    }
});