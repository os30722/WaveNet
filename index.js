/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event } from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => async () => {});
TrackPlayer.setupPlayer().then(() =>{
    TrackPlayer.updateOptions({
        android: {
            // This is the default behavior
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
        },
        capabilities: [
            Capability.Play,
            Capability.Pause
        ]
    });
});
