import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Theme from '../types/theme';
import { useThemeContext } from '../contexts/themeContext';

interface Props {
    style?: {
        size: number
    },
    label?: string,
    children?: React.ReactElement<Icon>,
    onClick?: () => void
}

function RoundButton({style, children, label, onClick}: Props): React.JSX.Element {
    const theme = useThemeContext();
    const styles = getStyles(style?.size, theme);

    return(
        <View style={styles.parent}>
            <TouchableOpacity style={styles.button} onPress={onClick}>
                {children}
            </TouchableOpacity>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const getStyles = (size: number = 100, theme: Theme) => StyleSheet.create({
    parent: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        height: size,
        width: size,
        backgroundColor: theme.primary,
        borderRadius: size/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        marginTop: 3,
        color: theme.primary,
    },
})

export default RoundButton;
