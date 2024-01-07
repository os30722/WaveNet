import React from "react";
import { StatusBar, StyleSheet, Text, View, useColorScheme } from "react-native";
import RecordPage from "./pages/recordPage";
import { NavigationContainer } from "@react-navigation/native";
import AudioPage from "./pages/audioPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ThemeContext from "./common/contexts/themeContext";
import { darkTheme } from "./common/types/theme";

export type RootStackParamList = {
  Record: undefined;
  Audio: {
    uri: string
  };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
    <ThemeContext.Provider value={darkTheme}>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer theme={{colors: {primary:darkTheme.primary, background: darkTheme.background, text: darkTheme.text}}}>
        <Stack.Navigator initialRouteName='Record' screenOptions={{headerStyle: {backgroundColor: darkTheme.background}}}>
          <Stack.Screen name='Record' component={RecordPage} />
          <Stack.Screen name='Audio' component={AudioPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
 
});

export default App;