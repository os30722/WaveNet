import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button } from "react-native";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";

type NavigationProp =  NativeStackScreenProps<
    RootStackParamList,
    'Home'
>

function HomePage(): React.JSX.Element {
    const { navigate } = useNavigation<NavigationProp>();

    return (
        <Button title="Click me" onPress={() => {
            navigation.navigate('UploadModal')
        }}/>
    )
}

export default HomePage;