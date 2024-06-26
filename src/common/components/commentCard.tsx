import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Theme from '../types/theme';
import { useThemeContext } from '../contexts/themeContext';
import { Comment } from '../types/posts';


interface Props {
    comment: Comment
    onClickReply?: (commentId: number) => void
}

function CommentCard({comment, onClickReply}: Props): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(theme);

    return (
        <View style={styles.parent}>
            <View style={styles.info}>
                <View style={styles.image}></View>
                <View style={styles.content}>
                    <Text style={styles.name}>{comment.username}</Text>
                    <Text style={styles.msg}>{comment.msg}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.interactions} onPress={() => onClickReply?.(comment.comment_id)}>
                <Text style={styles.labels}>{comment.replies_count ? `${comment.replies_count} Replies` : 'Reply'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'column',
    },
    info: {
        flexDirection: 'row'  
    },
    name: {
        fontSize: 10,
        color: theme.label
    },
    msg: {
        fontSize: 15,
        color: theme.text
    },
    image: {
        width: 35,
        height: 35,
        marginRight: 10,
        backgroundColor: theme.primary,
        borderRadius: 20,
    },
    content: {
        flexDirection: 'column',
    },
    interactions: {
        flexDirection: 'row'
    },
    labels: {
        fontSize: 12,
        color: theme.label
    }
  
});

export default memo(CommentCard);
