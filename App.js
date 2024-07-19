import React from 'react';
import { Slot } from 'expo-router';
import { AppProvider } from './context/userContext';

export default function App() {
    return (
        <AppProvider>
            <Slot />
        </AppProvider>
    );
}
