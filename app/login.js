import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { app } from '../firebaseConfig';
import { useRouter } from 'expo-router';
import { AppContext } from '@/context/userContext';
import { getDoc, collection, doc } from '@firebase/firestore';
import { firestore } from '../firebaseConfig';

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

    const auth = getAuth(app);
    const router = useRouter();
    const { setUser } = useContext(AppContext);

    const [values, setValues] = useState({
        email: "",
        pwd: ""
    })

    const fetchUserData = async (user) => {
        try {
            const userDocRef = doc(collection(firestore, 'users'), `${user.uid}`);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = {
                    uid: userDoc.id,
                    ...userDoc.data()
                }
                setUser(userData);
                return userData;
            } else {
                // TO-DO: Handle case where user document doesn't exist
            }
        } catch (error) {
            console.error('Error fetching user document:', error);
        }
    };

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
            .then((userCrediential) => {
                const signInUser = userCrediential.user;
                const user = fetchUserData(signInUser);
                if (user.role == 'student') {
                    router.replace('(tabs)/homepage');
                } else {
                    router.replace('(tabs)/homepage');
                }

            })
            .catch((error) => {
                alert(error.message)
            });
    }

    return <View style={styles.view}>
        <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>Login</Text>
        <TextBox placeholder="Email Address" onChangeText={text => handleChange(text, "email")} />
        <TextBox placeholder="Password" onChangeText={text => handleChange(text, "pwd")} secureTextEntry={true} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
            <Btn onClick={() => Login()} title="Login" style={{ width: "48%", backgroundColor: "#F5CAC2" }} />
            <Btn onClick={() => router.push("signup")} title="Sign Up" style={{ width: "48%", backgroundColor: "#F48584" }} />
        </View>
    </View>
}