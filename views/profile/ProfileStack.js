import React, { useContext } from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { turquose as color } from "../../data/colors";
import { profileView as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";

import Profile from "./Profile";

const Stack = createStackNavigator();

const ProfileStack = () => {

    // Global Context
    const { iLang, user } = useContext(GlobalContext);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: true,
                    title: user.name,
                    headerTintColor: color.grad[9],
                    headerBackTitle: dic.title[iLang],
                    // headerBackTitleVisible: true,
                    // headerTransparent: false
                }}
            >

            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default ProfileStack;