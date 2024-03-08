import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../types/theme';
import { useThemeContext } from '../contexts/themeContext';
import { Comment } from '../types/posts';

interface Props {
    comment: Comment
}

function CommentCard({comment}: Props): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(theme);

    return (
        <View style={styles.parent}>
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'column',
    },
  
});

export default memo(CommentCard);
