import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button } from "react-native";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./home";
import ProfilePage from "./profile";
import SearchPage from "./search";

export type BottomTabParamList = {
    Home: undefined,
    Search: undefined,
    Profile: undefined,
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

function MainPage(): React.JSX.Element {

    return (
        <Tab.Navigator>
            <Tab.Screen name ='Home' component={HomePage} />
            <Tab.Screen name='Search' component={SearchPage} />
            <Tab.Screen name='Profile' component={ProfilePage} />
        </Tab.Navigator>
    );
}

export default MainPage;