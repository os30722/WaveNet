import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Theme from '../types/theme';
import { useThemeContext } from '../contexts/themeContext';
import Slider from './slider';
import { formatDuraion } from '../../utils/date';
import TrackPlayer, { Event, State, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
    uri: string,
    duration: number
}

function PlayerLarge({uri}: Props): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(theme);
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const progress = useProgress(100);
    const controlsSize = 35;

    useTrackPlayerEvents([Event.PlaybackState], async (event) => {
        event.state == State.Playing ? setIsPlaying(true) : setIsPlaying(false);
    });

    useEffect(() => {
        (async function() {
            const track = {
                url: uri,
                title: 'Recording',
            }
            await TrackPlayer.setQueue([track])
        })()
        
        return (() => {
            TrackPlayer.stop();
            TrackPlayer.setQueue([])
        })
    }, []);
    
    const startAudio = async () => {
        const currentTrack = await TrackPlayer.getActiveTrack()
        if (progress.position >= progress.duration && currentTrack != undefined) await TrackPlayer.setQueue([currentTrack]);
        TrackPlayer.play();
    }

    const pauseAudio = async () => {
        TrackPlayer.pause();
    }

    const changeSeek = (newSeek: number) => {
        TrackPlayer.pause();
        TrackPlayer.seekTo(newSeek / 1000);
    }

    const onDragEnd = () => {
        TrackPlayer.play();
    }

    
    // Here progrss.position returns time in seconds we need to conver into milliseconds.
    return (
        <View style={styles.container}>
            <Slider minValue={0} maxValue={progress.duration * 1000} 
                onChangeValue={changeSeek} 
                currentValue={(progress.position)*1000}
                onDragEnd={onDragEnd}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>{formatDuraion(progress.position*1000)}</Text>
                <Text style={styles.infoText}>{formatDuraion(progress.duration * 1000)}</Text>
            </View>    
            <View style={styles.controls}>
                <TouchableOpacity onPress={() => TrackPlayer.seekTo(progress.position + 10)}>
                    <Icon name='forward-10' size={controlsSize} color='black' />
                </TouchableOpacity>
                <TouchableOpacity onPress={isPlaying ? pauseAudio : startAudio}>
                    {isPlaying ? 
                    <Icon name='pause' size={controlsSize} color='black' />
                    :<Icon name='play-arrow' size={controlsSize} color='black' />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => TrackPlayer.seekTo(progress.position - 10)}>
                    <Icon name='replay-10' size={controlsSize} color='black' />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'grey',
        borderRadius: 10
    }, 
    infoContainer: {
      flexDirection: 'row',
      marginTop: 7,
      justifyContent: 'space-between',
    },
    infoText: {
      color: theme.text,
    },
    controls: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-around'
    }
});

export default PlayerLarge;



