// PdfViewer.js

import React from 'react';
import { View, Text } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewer = ({ route }) => {
    const { pdfUrl, pdfTitle } = route.params;

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, margin: 10 }}>{pdfTitle}</Text>
            <Pdf
                source={{ uri: pdfUrl, cache: true }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                style={{ flex: 1 }}
            />
        </View>
    );
};

export default PdfViewer;
