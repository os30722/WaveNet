import React from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../types/theme';
import { useThemeContext } from '../contexts/themeContext';
import Slider from './Slider';

function PlayerLarge(): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(theme);

    return (
        <View style={styles.container}>
            <Slider minValue={0} maxValue={500}/>
        </View>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'grey',
    }       
});

export default PlayerLarge;



