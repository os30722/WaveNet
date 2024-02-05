import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "./main";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type PageNavigationProp = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
>

function HomePage({navigation}: PageNavigationProp): React.JSX.Element {

    return (
        <View>
            <Text>Home Page</Text>
        </View>
    );
}

export default HomePage;