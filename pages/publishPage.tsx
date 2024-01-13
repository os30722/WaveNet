import { RouteProp, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../App";
import TrackPlayer, { AppKilledPlaybackBehavior, RepeatMode } from "react-native-track-player";
import PlayerLarge from "../common/components/playerLarge";
import { useThemeContext } from "../common/contexts/themeContext";
import Theme from "../common/types/theme";

type PublishPageRouteProp = RouteProp<
    RootStackParamList,
    'Publish'
>;

function PublishPage(): React.JSX.Element {
    const route = useRoute<PublishPageRouteProp>();
    const theme = useThemeContext();
    const params = route.params;
    const styles = getStyles(theme);
    const [title, setTitle] = useState<string>()
    
    return (
        <View style={styles.container}>
            <PlayerLarge uri={params.uri} duration={params.duration} />
            <Text style={styles.labels}>Give A Title</Text>
            <TextInput
                maxLength={100}
                multiline
                style={styles.inputBox}
                value={title}
                onChangeText={setTitle}
                underlineColorAndroid='transparent'
            />
            <Text style={styles.labels}>Give A Description</Text>
            <TextInput
                maxLength={100}
                multiline
                style={styles.inputBox}
                value={title}
                onChangeText={setTitle}
                underlineColorAndroid='transparent'
            />
        </View>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    labels: {
        color: theme.label,
        fontSize: 20,
        marginTop: 30,
    },
    inputBox: {
        marginTop: 17,
        color: theme.text,
        borderColor: theme.label,
        borderWidth: 1,
        padding: 10,
        fontSize: 17,
        borderRadius: 5,
        lineHeight: 25,
     }
});

export default PublishPage;