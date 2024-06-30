import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from "react-native"

const styles = StyleSheet.create({
    btn: {
        height: 42,
        width: "92%",
        borderRadius: 25,
        marginTop: 20,
        backgroundColor: "#F48584",
        justifyContent: "center",
        alignItems: "center",
    },
    text:{
        fontSize: 20,
        color: "black"
    }

})

export default function Button(props){
    return <TouchableOpacity onPress={props.onClick}  style={{...styles.btn, ...props.style}}>
        <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
}