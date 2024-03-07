import React, { useCallback } from 'react';
import { Button, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './main';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { BASE_URL, useAxiosInfinite, useAxiosQuery } from '../../utils/network';
import Theme from '../../common/types/theme';
import { useThemeContext } from '../../common/contexts/themeContext';
import { Post, PostList } from '../../common/types/posts';
import TrackPlayer, { Track, TrackType } from 'react-native-track-player';
import PostCards from '../../common/components/postCards';


type PageNavigationProp = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
>

function HomePage({navigation}: PageNavigationProp): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(theme);
    const nextPageParam = useCallback((lastPage: PostList, pages: PostList[]) => {
        return lastPage.at(-1)?.post_id;
    }, []);
    const { data, fetchNextPage, refetch, isFetching} = useAxiosInfinite<Post>('posts/getPosts', ['posts'], nextPageParam)

    const playAudio = async (post: Post) => {
        console.log(post)
        const track: Track = {
            url: BASE_URL + '/static/' + post.url,
            type: TrackType.Dash,
            title: post.title,
        }
        console.log(track)
        await TrackPlayer.setQueue([track]);
        TrackPlayer.play();
    }

    return (
        <View style={styles.parent}>
            {data &&
                <FlatList 
                    data={data.pages.flat()}
                    renderItem={({item}) => <PostCards post={item}/>}
                    onEndReached={() => fetchNextPage()}
                    onEndReachedThreshold={5}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={    
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={refetch}
                            title="Pull to refresh"
                            progressBackgroundColor={theme.background}
                            colors={[theme.primary]} 
                         />
                      }
                />
            }
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