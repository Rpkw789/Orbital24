// NavigationStack.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../components/Products';
import NotesDetails from '../app/NotesDetails';

const Stack = createStackNavigator();

const NavigationStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Products">
                <Stack.Screen name="Products" component={Products} />
                <Stack.Screen name="NotesDetails" component={NotesDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigationStack;
