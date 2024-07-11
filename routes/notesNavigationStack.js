// NavigationStack.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NotesMarket from '../app/(tabs)/NotesMarket';
import NotesDetails from '../app/NotesDetails';

const Stack = createStackNavigator();

const NavigationStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="NotesMarket">
                <Stack.Screen name="NotesMarket" component={NotesMarket} />
                <Stack.Screen name="NotesDetails" component={NotesDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigationStack;
