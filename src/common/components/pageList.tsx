import React, { useCallback } from 'react';
import { useThemeContext } from '../contexts/themeContext';
import Theme from '../types/theme';
import { FlatList, StyleSheet, View } from 'react-native';
import { useAxiosInfinite } from '../../utils/network';
import { Post, PostList } from '../types/posts';
import PostCards from './postCards';

interface Props {
    style: StyleSheet.NamedStyles<any>
}

function PageList({ style }: Props): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(theme);
    const nextPageParam = useCallback((lastPage: PostList, pages: PostList[]) => {
        return lastPage.at(-1)?.id;
    }, []);
    const { data, fetchNextPage} = useAxiosInfinite<Post>('posts/getPosts', ['posts'], nextPageParam)

    return (
        <View style={style}>
            {data &&
                <FlatList 
                    data={data.pages.flat()}
                    renderItem={({item}) => <PostCards post={item}/>}
                    onEndReached={() => fetchNextPage()}
                    onEndReachedThreshold={5}
                    showsHorizontalScrollIndicator={false}
                    
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
});

export default PageList;