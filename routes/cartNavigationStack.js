import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingCart from '../app/shoppingCart';
import NotesDetails from '../app/NotesDetails';

const Stack = createStackNavigator();

const NavigationStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ShoppingCart">
                <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
                <Stack.Screen name="NotesDetails" component={NotesDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigationStack;
