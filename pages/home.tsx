import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button } from "react-native";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from 'expo-document-picker';

type PageNavigationProp =  NativeStackScreenProps<
    RootStackParamList,
    'Home'
>

function HomePage({navigation}: PageNavigationProp): React.JSX.Element {
    const [audio, setAudio] = useState<any>();

    return (
        <Button title="Click me" onPress={async () => {
            setAudio(await DocumentPicker.getDocumentAsync({type: 'audio/*', copyToCacheDirectory: true}))
        }}/>
    )
}

export default HomePage;