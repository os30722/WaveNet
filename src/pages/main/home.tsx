import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
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
import PostCards from '../../common/components/postCards';
import PageList from '../../common/components/pageList';

type PageNavigationProp = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
>

function HomePage({navigation}: PageNavigationProp): React.JSX.Element {
    const { data, error } = useAxiosQuery<PostList>('posts/getPosts', ['posts'])
    const theme = useThemeContext();
    const styles = getStyles(theme);

    return (
        <View style={styles.parent}>
            <PageList style={styles.list}/>
        </View>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'column',
    },
    list: {
        flex: 1
    }
});

export default HomePage;