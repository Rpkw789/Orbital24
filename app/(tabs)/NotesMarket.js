import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Text, Image } from 'react-native';
import Homepage from '../../components/homepage';
import { resumeDownload } from 'react-native-fs';

const NotesMarket = () => {
    return (
        <ScrollView style={styles.container}>
            <Homepage />
            <View>
                <View style={styles.bytwo}> 
                    <View style={styles.placeholder}>
                        <Image source={require('@/assets/images/sec4.png')} style = {styles.pics}
                        />
                        <Text>
                            Secondary 3/4 (G3) Topical Mathematics
                        </Text>
                    </View>
                    <View style={styles.placeholder}>
                        <Image source={require('@/assets/images/j1.png')} style = {styles.pic} />
                        <Text>
                            A level Pure Mathematics
                        </Text>
                    </View>
                </View>
            </View>

        </ScrollView>

    );
};

export default NotesMarket;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9EDE3"
    },
    bytwo: {
        flexDirection: "row",
        height: 200
    },
    pic: {
        height: 100,
        width: 50
    }

});