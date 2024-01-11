import { RouteProp, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { RootStackParamList } from "../App";
import TrackPlayer, { AppKilledPlaybackBehavior, RepeatMode } from "react-native-track-player";
import PlayerLarge from "../common/components/playerLarge";

type AudioPageRouteProp = RouteProp<
    RootStackParamList,
    'Audio'
>;

function AudioPage(): React.JSX.Element {
    const route = useRoute<AudioPageRouteProp>();
    
    return (
        <PlayerLarge />
    );
}

export default AudioPage;