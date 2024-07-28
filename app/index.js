import { View, Text, StyleSheet, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

const index = () => {
  const router = useRouter();

  const [loaded] = useFonts({
    LobsterTwoItalic: require('../assets/fonts/LobsterTwo-Italic.ttf'),
  });

  return (
      <ScrollView>
        <View style={styles.generalcontainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.hellotext}>
              hello!
            </Text>
          </View>
          
            <TouchableOpacity onPress={() => router.push("./login")} style={styles.login}>
              <Text style={styles.buttontext}>Log in</Text>
            </TouchableOpacity>
          
          <View>
            <Text style={styles.smalltext}>
              or new here?
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("./signup")} style={styles.login}>
              <Text style={styles.buttontext}>Sign up</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
  );
}

export default index;

const styles = StyleSheet.create({
  generalcontainer: {
    gap: 8,
    paddingTop: 70,
    paddingRight: 10,
    paddingLeft: 10,
    color: "#F9EDE3"
  },
  login: {
    backgroundColor: "#F5CAC2",
    marginLeft: 30,
    marginRight: 60,
    alignItems: "flex-start", // changed
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 10,
    height: 50,
  },
  hellotext: {
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 80,
    fontSize: 50,
    //fontFamily: "LobsterTwoItalic",
    color: "#F7BE61"
  },
  smalltext: {
    fontSize: 17,
    marginLeft: 30,
    marginTop: 10,
    color: "#F7BE61"
  },
  fastButton: {
    top: 10,
    marginLeft: 30,
    marginRight: 60,
    alignItems: "flex-start", // changed
    paddingLeft: 10,
    fontSize: 40,
    borderRadius: 10,
    height: 50,
  },
  buttontext: {
    color: 'black',
    fontSize: 17,

  }
});
