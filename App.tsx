/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ChangeListeningDb } from './frontend/api/api';
import ChannelList from './frontend/pages/ChannelList';
import { SafeAreaView } from 'react-native';



function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ChannelList/>
    </SafeAreaView>
  );
}



export default App;
