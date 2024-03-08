import React from 'react';
import { StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native';
import RecordPage from './pages/record';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import AudioPage from './pages/publish';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ThemeContext from './common/contexts/themeContext';
import { darkTheme } from './common/types/theme';
import HomePage, { BottomTabParamList } from './pages/main/main';
import MainPage from './pages/main/main';
import SelectionPage from './pages/main/selection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CommentsPage from './pages/comments';

export type RootStackParamList = {
  Record: undefined;
  Publish: {
    uri: string,
    duration: number,
  },
  Main: NavigatorScreenParams<BottomTabParamList>,
  Selection: undefined,
  Comments: {
    postId: number
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

function App(): React.JSX.Element {

  return (
    <ThemeContext.Provider value={darkTheme}>
      <StatusBar translucent backgroundColor='transparent' />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={{colors: {primary:darkTheme.primary, background: darkTheme.background, text: darkTheme.text}}}>
          <Stack.Navigator initialRouteName='Main' screenOptions={{headerStyle: {backgroundColor: darkTheme.background}}}>
            <Stack.Group screenOptions={{ animation: 'slide_from_right' }}>
              <Stack.Screen name='Main' component={MainPage} />
              <Stack.Screen name='Record' component={RecordPage} />
              <Stack.Screen name='Publish' component={AudioPage} />   
              <Stack.Screen name='Selection' component={SelectionPage} options={{
                headerShown: false,
                presentation: 'transparentModal',
                animation: 'none'
              }}/>
              <Stack.Screen name='Comments' component={CommentsPage} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
        </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
 
});

export default App;