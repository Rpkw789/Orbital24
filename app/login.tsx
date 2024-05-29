import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Button} from 'react-native';
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

const AuthScreen = ({email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication}) => {
    return(
        <View style = {styles.authContainer}>
            <Text style = {styles.title}>
                {isLogin ? 'Log in' : 'Sign up'}
            </Text>
            <TextInput style ={styles.input}
            value = {email}
            onChangeText={setEmail}
            placeholder='Email'
            autoCapitalize='none'
            />
            <TextInput style ={styles.input}
            value = {password}
            onChangeText={setPassword}
            placeholder='Password'
            secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button title={isLogin? 'Log in': 'Sign up'} onPress={handleAuthentication} color= "#F7BE61" />
            </View>

            <View style={styles.bottomcontainer}>
                <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
                    {isLogin? 'Need an account? Sign up' : 'Already have an account? Log in'}
                </Text>
            </View>
        </View>
    );
}

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.emailText}>{user.email}</Text>
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      </View>
    );
  };

  export default App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // Track user authentication state
    const [isLogin, setIsLogin] = useState(true);
  
    const auth = getAuth(app);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, [auth]);
  
    
    const handleAuthentication = async () => {
      try {
        if (user) {
          // If user is already authenticated, log out
          console.log('User logged out successfully!');
          await signOut(auth);
        } else {
          // Sign in or sign up
          if (isLogin) {
            // Sign in
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully!');
          } else {
            // Sign up
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created successfully!');
          }
        }
      } catch (error) {
        console.error('Authentication error:', error.message);
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {user ? (
          // Show user's email if user is authenticated
          <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
        ) : (
          // Show sign-in or sign-up form if user is not authenticated
          <AuthScreen
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthentication={handleAuthentication}
          />
        )}
      </ScrollView>
    );
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        elevation: 3
    },
    title: {
        fontSize: 24, 
        marginBottom: 16,
        textAlign: 'center'
    }, 
    input: {
        height: 40,
        borderColor: "plum",
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
    },
    buttonContainer: {
        marginBottom: 16
    },

    toggleText: {
        color: '#3498db',
        textAlign: 'center',
      },
      bottomContainer: {
        marginTop: 20,
      },
      emailText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
      }
});