import React, { useCallback, useState } from 'react';
import { useThemeContext } from '../common/contexts/themeContext';
import Theme from '../common/types/theme';
import { FlatList, RefreshControl, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Comment, CommentList } from '../common/types/posts';
import { useAxiosInfinite, useAxiosMutation } from '../utils/network';
import CommentCard from '../common/components/commentCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Icon from 'react-native-vector-icons/MaterialIcons';

type PageNavigationProp =  NativeStackScreenProps<
    RootStackParamList,
    'Comments'
>


const INTERATION_SIZE = 32

function CommentsPage({navigation, route}: PageNavigationProp): React.JSX.Element {
    const params = route.params
    const theme = useThemeContext();
    const styles = getStyles(theme);
    const nextPageParam = useCallback((lastPage: CommentList, paes: CommentList[]) => {
        return lastPage.at(-1)?.comment_id;
    }, []);
    const { data, fetchNextPage, refetch, isFetching} = useAxiosInfinite<Comment>(`posts/comments/${params.postId}`, ['comments', params.postId.toString()], nextPageParam)
    const [comment, setComment] = useState<string>('')
    const { mutate: addPost } = useAxiosMutation('/posts/comment?action=add')

    const addComment = () => {
        addPost({
            post_id: params.postId,
            msg: comment
        }, {
            onSuccess: (data) => {
                console.log(data)
            }
        })
        setComment('')
    }

    return (
        <View style={styles.parent}>
             <FlatList
                    data={data?.pages.flat()}
                    renderItem={({item}) => <CommentCard comment={item}/>}
                    onEndReached={() => fetchNextPage()}
                    onEndReachedThreshold={5}
                    showsVerticalScrollIndicator={false}
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
            <View style={styles.inputPanel}>
                <View style={styles.image}></View>
                <TextInput 
                    multiline={true}
                    style={styles.commentBox}
                    selectionColor={theme.text}
                    placeholder='Add a comment....'
                    placeholderTextColor={theme.label}
                    value={comment}
                    onChangeText={setComment}
                />
                {comment != '' && 
                <TouchableOpacity onPress={addComment}>
                    <Icon name='add' size={INTERATION_SIZE} 
                                    color={theme.primary} />
                </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    parent: {
        flexDirection: 'column',
        paddingHorizontal: 12,
        flex: 1
    },
    inputPanel: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 35,
        height: 35,
        marginRight: 10,
        backgroundColor: theme.primary,
        borderRadius: 20,
    },
    commentBox: {
        color: theme.text,
        textAlignVertical: 'top',
        flex: 1,
        maxHeight: 100
    }
}) 

export default CommentsPage;