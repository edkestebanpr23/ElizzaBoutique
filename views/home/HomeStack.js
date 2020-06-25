import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Text>Home Stack</Text>
    );
}

export default HomeStack;