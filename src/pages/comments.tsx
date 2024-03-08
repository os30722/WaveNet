import React, { useCallback } from 'react';
import { useThemeContext } from '../common/contexts/themeContext';
import Theme from '../common/types/theme';
import { StyleSheet, View } from 'react-native';
import { Comment, CommentList } from '../common/types/posts';
import { useAxiosInfinite } from '../utils/network';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import CommentCard from '../common/components/commentCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type PageNavigationProp =  NativeStackScreenProps<
    RootStackParamList,
    'Comments'
>

function CommentsPage({navigation, route}: PageNavigationProp): React.JSX.Element {
    const params = route.params
    const theme = useThemeContext();
    const styles = getStyles(theme);
    const nextPageParam = useCallback((lastPage: CommentList, pages: CommentList[]) => {
        return lastPage.at(-1)?.comment_id;
    }, []);
    const { data, fetchNextPage, refetch, isFetching} = useAxiosInfinite<Comment>(`posts/comments/${params.postId}`, ['comments'], nextPageParam)

    return (
        <View style={styles.parent}>
             <FlatList
                    data={data?.pages.flat()}
                    renderItem={({item}) => <CommentCard comment={item}/>}
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
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    parent: {
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingBottom: 15,
    },
}) 

export default CommentsPage;