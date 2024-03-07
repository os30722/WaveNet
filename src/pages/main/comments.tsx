import React from 'react';
import { useThemeContext } from '../../common/contexts/themeContext';
import Theme from '../../common/types/theme';
import { StyleSheet, View } from 'react-native';


function CommentPage(): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(theme);

    return (
        <View style={styles.parent}>

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

export default CommentPage;