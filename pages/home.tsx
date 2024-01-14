import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button } from "react-native";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";

type PageNavigationProp =  NativeStackScreenProps<
    RootStackParamList,
    'Home'
>

function HomePage({navigation}: PageNavigationProp): React.JSX.Element {

    return (
        <Button title="Click me" onPress={() => {
            navigation.navigate('Record')
        }}/>
    )
}

export default HomePage;