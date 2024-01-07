import { RouteProp, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { RootStackParamList } from "../App";
import TrackPlayer, { AppKilledPlaybackBehavior, RepeatMode } from "react-native-track-player";

type AudioPageRouteProp = RouteProp<
    RootStackParamList,
    'Audio'
>;

function AudioPage(): React.JSX.Element {
    
    const route = useRoute<AudioPageRouteProp>();
     
    const startTrackPlayer = () => {
        const track = {
            url: route.params.uri, // Load media from the app bundle
            title: 'Recording',
        };
        TrackPlayer.setQueue([track]);
        TrackPlayer.play();
    }


    return (
        <Button onPress={startTrackPlayer} title="click"/>
    );
}

export default AudioPage;