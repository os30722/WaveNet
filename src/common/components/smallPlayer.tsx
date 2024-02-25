import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeContext } from '../contexts/themeContext';
import Theme from '../types/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from './slider';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';

function SmallPlayer(): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(theme);
    const controlsSize = 37;
    const progress = useProgress(1000);
    const playerState = usePlaybackState();
    const isPlaying = playerState.state === State.Playing;


    const playAudio = async () => {
        TrackPlayer.play();
    }

    const pauseAudio = async () => {
        TrackPlayer.pause();
    }


    return (
        <View style={styles.parent}>
            <View style={styles.info}>
                <View style={styles.image}></View>
                <View style={styles.labels}>
                    <Text style={styles.tite} numberOfLines={1}>This is a test song looks razy good fefe</Text>
                    <Text style={styles.artist} numberOfLines={1}>Artist</Text>
                </View>
                <TouchableOpacity onPress={isPlaying? pauseAudio : playAudio}>
                    { isPlaying ? 
                    <Icon name='pause' size={controlsSize} color='white' style={styles.control}/>
                    :<Icon name='play-arrow' size={controlsSize} color='white' style={styles.control}/>}
                </TouchableOpacity>
                <Icon name='close' size={controlsSize} color='white' />
            </View>
            <Slider minValue={0} maxValue={progress.duration * 1000} currentValue={progress.position * 1000}
                height={2} hideThumb />
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    parent: {
        backgroundColor: theme.background,
        marginBottom: 3,
        marginHorizontal: 12,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    image: {
        width: 35,
        height: 35,
        marginRight: 4,
        backgroundColor: theme.primary,
        borderRadius: 17.5,
    },
    labels: {
        flexDirection: 'column',
        flexShrink: 1,
    },
    tite: {
        color: theme.text,
        fontSize: 15,
    },
    artist: {
        color: theme.text,
        fontSize: 13,
    },
    control: {
        marginRight: 5
    }

})

export default SmallPlayer;