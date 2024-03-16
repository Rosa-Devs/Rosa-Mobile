/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ChangeListeningDb } from './frontend/api/api';
import ChannelList from './frontend/screens/ChannelList';
import { SafeAreaView, StyleSheet, Text, ToastAndroid, View, useColorScheme } from 'react-native';
import NavBar from './frontend/items/NavBar';
import RouterStack from './frontend/routes/RouterStack';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';


const App = (): React.JSX.Element => {


  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RouterStack></RouterStack>
    </NavigationContainer>
  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // paddingTop: 0, // Adjust as needed
    // paddingHorizontal: 0, // Adjust as needed
  },
});



export default App;
