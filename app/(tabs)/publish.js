import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import UploadPage from "../../components/upload";
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import PublishIndex from "../../components/PublishIndex";
import Listing from "../../components/TutorListing";

const Publish = () => {

    const [page, setPage] = useState(0);

    useFocusEffect(
        useCallback(() => {
            setPage(0);
        }, [])
    );

    return (
        <View style={styles.container}>
            {(() => {
                if (page == 0) {
                    return <PublishIndex setPage={setPage}/>
                } else if (page == 1) {
                    return <UploadPage setPage={setPage}/>
                } else {
                    return <Listing setPage={setPage}/>
                }
            })()}
        </View>
    )
}

export default Publish;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9EDE3',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    button: {
        backgroundColor: '#344869',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: '45%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});