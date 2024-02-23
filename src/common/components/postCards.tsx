import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeContext } from '../contexts/themeContext';
import Theme from '../types/theme';
import { Post } from '../types/posts';

interface Props {
    post: Post
}

function PostCards({post}: Props): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(theme);

    return (
        <View style={styles.parent}>
            <Text style={styles.author}>{post.author}</Text>
            <View style={styles.info}>
                <View style={styles.image}></View>
                <Text style={styles.tite}>{post.title}</Text>
            </View>
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    parent: {
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingBottom: 15,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    author: {
        color: theme.label,
        marginBottom: 2,
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 10,
        backgroundColor: theme.primary,
        borderRadius: 20,
    },
    tite: {
        color: theme.text,
        fontSize: 17,
    },
})


export default PostCards;