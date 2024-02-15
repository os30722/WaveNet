import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ToastAndroid } from 'react-native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RoundButton from '../common/components/roundButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Theme from '../common/types/theme';
import { useThemeContext } from '../common/contexts/themeContext';
import { formatDuraion } from '../utils/date';

type PageNavigationProp = NativeStackScreenProps <
    RootStackParamList,
    'Record'
>;

function RecordPage({navigation}: PageNavigationProp): React.JSX.Element {
    const maxDuration = 300000;

    const [recording, setRecording] = useState<Audio.Recording>();
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(maxDuration);
    const theme = useThemeContext();
    const styles = getStyles(theme);

    useEffect(() => {
        if (recording) {
            recording.setOnRecordingStatusUpdate(recordingStatusUpdate);
            return () => {
                recording?.setOnRecordingStatusUpdate(null);
                recording?.stopAndUnloadAsync();
                Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                });    
            }
        }

    }, [recording])

    const startRecording = async () => {
        setIsRecording(true);
        try {
            await Audio.requestPermissionsAsync();  
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            }); 
            
            const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY, null,
                1000);
            setRecording(recording);

        } catch (err) {
            console.log('Falied to start recording ', err)
            setIsRecording(false);
        }
    };



    const stopRecording = async () => {
        setIsRecording(false)
        await recording?.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });        
        const uri = recording?.getURI();
        setRecording(undefined);
        navigation.navigate('Publish', {
            uri: uri!!,      // Showing confidence that uri cannot be null. Fix it later
            duration:   maxDuration - duration
        });
    };

    const pauseRecording = async () => {
        await recording?.pauseAsync();
        setIsRecording(false);
    }

    const resumeRecording = async () => {
        await recording?.startAsync();
        setIsRecording(true);
    }

    const recordingStatusUpdate =  async (status: Audio.RecordingStatus) => {
        let durationMillis = status.durationMillis;
        if (status.isDoneRecording) return;
        if (durationMillis >= maxDuration) {
            await stopRecording();
            return;
        } 
        setDuration(maxDuration - durationMillis);
    };

    return (
        <View style={styles.parent}>
            <View style={styles.info}>
            <Text style={styles.duration}>{formatDuraion(duration)}</Text>
            </View>
            <View style={styles.controls}>
                {
                    isRecording || recording ? 
                    <>
                       <RoundButton style={{size: 70}} onClick={isRecording ? pauseRecording : resumeRecording } label={isRecording ? 'pause' : 'resume'}>
                        <Icon name={isRecording ? 'pause' : 'mic-none'} size={35} color='white' />
                     </RoundButton>
                    <RoundButton style={{size: 70}} onClick={stopRecording} label='stop'>
                        <Icon name='stop' size={35} color='white' />
                     </RoundButton>
                     </>
                    : <RoundButton style={{size: 70}} onClick={startRecording} label='start'>
                        <Icon name='mic' size={35} color='white' />
                     </RoundButton>
                }
               
            </View>
        </View>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'column',
    },
    info: {
        flexGrow: 1,
        paddingTop: 50,
        alignItems: 'center',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingBottom: 100
    },
    duration: {
        color: theme.text,
        fontSize: 90
    }
});




export default RecordPage;