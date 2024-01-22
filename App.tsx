import React from "react";
import { StatusBar, StyleSheet, Text, View, useColorScheme } from "react-native";
import RecordPage from "./pages/record";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import AudioPage from "./pages/publish";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ThemeContext from "./common/contexts/themeContext";
import { darkTheme } from "./common/types/theme";
import HomePage, { BottomTabParamList } from "./pages/main";
import MainPage from "./pages/main";
import SelectionPage from "./pages/selection";

export type RootStackParamList = {
  Record: undefined;
  Publish: {
    uri: string,
    duration: number,
  },
  Main: NavigatorScreenParams<BottomTabParamList>,
  Selection: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
    <ThemeContext.Provider value={darkTheme}>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer theme={{colors: {primary:darkTheme.primary, background: darkTheme.background, text: darkTheme.text}}}>
        <Stack.Navigator initialRouteName='Main' screenOptions={{headerStyle: {backgroundColor: darkTheme.background}}}>
          <Stack.Group screenOptions={{ }}>
            <Stack.Screen name='Main' component={MainPage} />
            <Stack.Screen name='Record' component={RecordPage} />
            <Stack.Screen name='Publish' component={AudioPage} />   
            <Stack.Screen name='Selection' component={SelectionPage} options={{
               headerShown: false,
               presentation: "transparentModal",
               animation: 'none'
            }}/>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
 
});

export default App;