
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./screens/Login"
import HomeScreen from "./screens/Home"
import SignUpScreen from "./screens/SignUp"
import firebase from 'firebase/app';
import "firebase/auth";

const Stack = createNativeStackNavigator();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const firebaseConfig = {
    apiKey: "AIzaSyBfKZPjYfyckkK_LurdYvgR3taj5ecxujM",
    authDomain: "edusell-460f4.firebaseapp.com",
    projectId: "edusell-460f4",
    storageBucket: "edusell-460f4.appspot.com",
    messagingSenderId: "530222344689",
    appId: "1:530222344689:web:2d11705c8e8a61d6a63c50",
    measurementId: "G-7H12H4S6GT"
  };

  //Checking if firebase has been initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  });



  return (
    <NavigationContainer>
      {isLoggedIn ? <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator> :
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>}
    </NavigationContainer>
  );
}

export default App;