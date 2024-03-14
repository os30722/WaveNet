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
import PostCards from '../../common/components/postCard';


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

    const navigateComment = useCallback((postId: number) => {
        navigation.navigate('Comments', {
            postId: postId
        })
    }, [navigation])


    return (
        <View style={styles.parent}>
                <FlatList 
                    data={data?.pages.flat()}
                    renderItem={({item}) => <PostCards post={item} navigateComment={navigateComment}/>}
                    onEndReached={() => fetchNextPage()}
                    onEndReachedThreshold={5}
                    showsVerticalScrollIndicator={false}
                    refreshControl={    
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={refetch}
                            title='Pull to refresh'
                            progressBackgroundColor={theme.background}
                            colors={[theme.primary]} 
                         />
                      }
                />
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