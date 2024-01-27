import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useMemo, useRef } from "react";
import { RootStackParamList } from "../App";
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import Theme from "../common/types/theme";
import { useThemeContext } from "../common/contexts/themeContext";
import * as DocumentPicker from 'expo-document-picker';

type PageNavigationProp = NativeStackScreenProps<
    RootStackParamList,
    'Selection'
>

function SelectionPage({navigation}: PageNavigationProp): React.JSX.Element {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoint = useMemo(() => ['40%'], []);
    const theme = useThemeContext();
    const styles = getStyles(theme);

    const handleSheetChanges = useCallback((index: number) => {
        if (index == -1) {
            navigation.pop()
        }
    }, [])

    const navigateToRecord = () => {
        navigation.navigate('Record');
    }

    const pickAudioFile = async () => {
        let options: DocumentPicker.DocumentPickerOptions = {
            
        };
        let result = await DocumentPicker.getDocumentAsync(options);
        if (result.assets != null) {
            navigation.navigate('Publish', {
                uri: result.assets[0].uri,
                duration: 0,
            });
        }
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoint}
                    index={0}
                    enablePanDownToClose
                    backgroundStyle={styles.bottomSheet}
                    onChange={handleSheetChanges}
                >
                    <View style={styles.contentContainer}>
                        <Text style={styles.label}>Create From</Text>
                        <TouchableOpacity onPress={pickAudioFile}>
                            <Text style={styles.options}>Device Storage</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToRecord}>
                            <Text style={styles.options}>On-Device Recoding</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    bottomSheet: {
        backgroundColor: theme.bottomSheet,
    },  
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 10,
        paddingHorizontal: 17,
    },
    label: {
        color: theme.text,
        alignSelf: 'center',
        paddingBottom: 12,
        fontSize: 20
    },
    options: {
        paddingTop: 20,
        fontSize: 15,
        color: theme.text,
    }
});

export default SelectionPage;

