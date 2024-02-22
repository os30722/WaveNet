import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './main';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAxiosQuery } from '../../utils/network';
import Theme from '../../common/types/theme';
import { useThemeContext } from '../../common/contexts/themeContext';
import { Post, PostList } from '../../common/types/posts';
import TrackPlayer, { Track, TrackType } from 'react-native-track-player';

type PageNavigationProp = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
>

function HomePage({navigation}: PageNavigationProp): React.JSX.Element {
    const { data, error } = useAxiosQuery<PostList>('posts/getPosts', ['posts'])
    const theme = useThemeContext();
    const styles = getStyles(theme);

    const playAudio = async (post: Post) => {
        const track: Track = {
            url: post.url,
            type: TrackType.Dash,
            title: post.title,
        }
        console.log(track)
        await TrackPlayer.setQueue([track]);
        TrackPlayer.play();
    }

    return (
        <View style={styles.parent}>
            {data?.map((post: any) => {
                return (
                    <Button key={post.id} title={post.title} onPress={() => playAudio(post)}/>  
                )
            })}
        </View>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'column',
    },
})

export default HomePage;