import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../App';
import PublishPlayer from '../common/components/publishPlayer';
import { useThemeContext } from '../common/contexts/themeContext';
import Theme from '../common/types/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

type PageNavigationProp =  NativeStackScreenProps<
    RootStackParamList,
    'Publish'
>

function PublishPage({navigation, route}: PageNavigationProp): React.JSX.Element {
    const params = route.params;
    const theme = useThemeContext();
    const styles = getStyles(theme);
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity>
                    <Icon name='arrow-forward' size={30} color={theme.primary} />
                </TouchableOpacity>
            )
        })
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', e => {
            e.preventDefault();
            unsubscribe();
            navigation.popToTop();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            <PublishPlayer uri={params.uri} duration={params.duration} />
            <Text style={styles.labels}>Give A Title</Text>
            <TextInput
                maxLength={100}
                multiline
                style={styles.inputBox}
                value={title}
                onChangeText={setTitle}
                underlineColorAndroid='transparent'
            />
            <Text style={styles.labels}>Give A Description</Text>
            <TextInput
                maxLength={300}
                multiline
                style={styles.inputBox}
                value={description}
                onChangeText={setDescription}
                underlineColorAndroid='transparent'
            />
        </ScrollView>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    labels: {
        color: theme.label,
        fontSize: 17,
        marginTop: 25,
    },
    inputBox: {
        marginTop: 10,
        color: theme.text,
        borderColor: theme.label,
        borderWidth: 1,
        padding: 10,
        fontSize: 15,
        borderRadius: 5,
        lineHeight: 25,
     }
});

export default PublishPage;