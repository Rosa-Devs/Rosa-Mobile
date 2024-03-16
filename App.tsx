/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ChangeListeningDb } from './frontend/api/api';
import ChannelList from './frontend/pages/ChannelList';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NavBar from './frontend/items/NavBar';



const App = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar/>
      <View style={styles.content}>
        <ChannelList/>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // paddingTop: 0, // Adjust as needed
    // paddingHorizontal: 0, // Adjust as needed
  },
});



export default App;
