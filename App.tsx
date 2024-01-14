import React from "react";
import { StatusBar, StyleSheet, Text, View, useColorScheme } from "react-native";
import RecordPage from "./pages/record";
import { NavigationContainer } from "@react-navigation/native";
import AudioPage from "./pages/publish";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ThemeContext from "./common/contexts/themeContext";
import { darkTheme } from "./common/types/theme";
import HomePage from "./pages/home";
import UploadModal from "./common/components/uploadModal";

export type RootStackParamList = {
  Record: undefined;
  Publish: {
    uri: string,
    duration: number,
  },
  Home: undefined,
  UploadModal: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
    <ThemeContext.Provider value={darkTheme}>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer theme={{colors: {primary:darkTheme.primary, background: darkTheme.background, text: darkTheme.text}}}>
        <Stack.Navigator initialRouteName='Record' screenOptions={{headerStyle: {backgroundColor: darkTheme.background}}}>
          <Stack.Group>
            <Stack.Screen name='Home' component={HomePage} />
            <Stack.Screen name='Record' component={RecordPage} />
            <Stack.Screen name='Publish' component={AudioPage} />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name='UploadModal' component={UploadModal} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
 
});

export default App;