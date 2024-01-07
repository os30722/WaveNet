import React from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../types/theme';
import { useThemeContext } from '../contexts/themeContext';

function PlayerLarge(): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(theme);

    return (
        <View>
            <Slider />
        </View>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    slider: {
        height:30,
        transform: [{ scaleY: 1.7 }]
    }
});

export default PlayerLarge;



