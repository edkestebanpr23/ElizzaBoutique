import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Root } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { turquose as color } from "../data/colors";
import { appView as dic } from "../data/languague";


// Components
import Login from "./start/Login";
import SingUp from "./start/Singup";
import Photo from "./start/Photo";
import Cropp from "./start/Cropp";

const Stack = createStackNavigator();

const Start = (props) => {
    let iLang = 0;
    console.log('Start:', props);

    return (
        <>
            <Root>
                <NavigationContainer>
                    <Stack.Navigator>

                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                headerShown: false
                            }}
                        >

                        </Stack.Screen>



                        <Stack.Screen
                            name="SingUp"
                            component={SingUp}
                            options={{
                                headerShown: true,
                                title: '',
                                headerTintColor: color.grad[0],
                                headerBackTitle: dic.login[iLang],
                                headerBackTitleVisible: true,
                                headerTransparent: true
                            }}
                        ></Stack.Screen>

                        <Stack.Screen
                            name="Photo"
                            component={Photo}
                            options={{
                                // headerShown: false
                                title: 'Foto'
                            }}
                        >
                        </Stack.Screen>


                        <Stack.Screen
                            name="Cropp"
                            component={Cropp}
                            options={{
                                // headerShown: false
                                title: 'Cropp'
                            }}
                        >

                        </Stack.Screen>

                    </Stack.Navigator>
                </NavigationContainer>
            </Root>
        </>
    );
};

const styles = StyleSheet.create({

});

export default Start;