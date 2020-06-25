import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../data/colors";

// Stack Main Views
import Home from "./home/Home";
import HomeStack from "./home/HomeStack";
import Social from "./social/Social";
import ProfileStack from "./profile/ProfileStack";
import Profile from "./profile/Profile";
import Settings from "./settings/Settings";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeBackgroundColor: colors.turquose.grad[8],
                    inactiveBackgroundColor: colors.turquose.grad[6],
                    activeTintColor: colors.turquose.grad[0],
                    inactiveTintColor: colors.turquose.grad[2],
                    style: styles.tabBar,
                    tabStyle: { borderTopStartRadius: 15, borderTopEndRadius: 15, marginHorizontal: 1 },
                    // style={ margin: 3, },

                }}
            >

                <Tab.Screen
                    name='HomeStack'
                    component={HomeStack}
                    options={{
                        tabBarIcon: () => <Icon name="home" color={colors.turquose.grad[1]} size={24} />
                    }}

                />

                <Tab.Screen
                    name='Social'
                    component={Social}
                    options={{
                        tabBarIcon: () => <Icon name="people" color={colors.turquose.grad[1]} size={24} />
                    }}
                />

                <Tab.Screen
                    name='Profile'
                    component={ProfileStack}
                    options={{
                        tabBarIcon: () => <Icon name="person" color={colors.turquose.grad[1]} size={24} />
                    }}
                />

                <Tab.Screen
                    name='Settings'
                    component={Settings}
                    options={{
                        tabBarIcon: () => <Icon name="settings" color={colors.turquose.grad[1]} size={24} />
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        borderRadius: 30,
        marginHorizontal: 4,
        backgroundColor: 'rgba( 255, 255, 255, 0)'
    }
});

export default Tabs;