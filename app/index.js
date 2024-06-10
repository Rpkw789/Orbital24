import { View, Text, Image, StyleSheet, Platform, ScrollView, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

export default function start() {
  const router = useRouter();

  const [loaded] = useFonts({
    LobsterTwoItalic: require('../assets/fonts/LobsterTwo-Italic.ttf'),
  });

  return (
    <ScrollView>
      <View style={styles.generalcontainer}>
      <View style={{flex: 1}}> 
        <Text style= {styles.hellotext}>
            hello!
          </Text>
      </View>
      <View style= {styles.button}>
        <Button title="Log in" color="#86A49C" onPress={() => router.push("./login")}/>
      </View>
      <View>
        <Text style= {styles.smalltext}>
          or new here?
        </Text>
      </View>
      <View style = {styles.button}>
        <Button title="Sign up" color="#86A49C" onPress={() => router.push("./signup")}/>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  generalcontainer: {
    gap: 8,
    paddingTop: 70,
    paddingRight: 10,
    paddingLeft: 10,
    color: "#F9EDE3"
  },
  button: {
    backgroundColor: "#F5CAC2",
    marginLeft: 30,
    marginRight: 60,
    alignItems: "flex-start", // changed
    paddingLeft: 10,
    fontSize: 40,
    borderRadius: 10,
    height: 50,
  },
  hellotext: {
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 80,
    fontSize: 50,
    fontFamily: "LobsterTwoItalic",
    color: "#F7BE61"
  },
  smalltext:{
    fontSize: 17,
    marginLeft: 30,
    marginTop: 10,
    color: "#F7BE61"
  }
});
