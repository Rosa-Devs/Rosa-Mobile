/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Authorized, ChangeListeningDb } from './frontend/api/api';
import ChannelList from './frontend/screens/ChannelList';
import { SafeAreaView, StyleSheet, Text, ToastAndroid, View, useColorScheme } from 'react-native';
import NavBar from './frontend/items/NavBar';
import RouterStack from './frontend/routes/RouterStack';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import CreateAccount from './frontend/screens/CreateNewAccount';
import LoadingIndicator from './frontend/items/LoadingIndicator';


const App = (): React.JSX.Element => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const authorized = await Authorized();
        setIsAuthorized(authorized);
      } catch (error) {
        // If an error occurs, wait for 1 second and then check again
        setTimeout(checkAuthorization, 1000);
      }
    };

    checkAuthorization();
  }, []);

  const scheme = useColorScheme(); // Assuming you're using useColorScheme hook to detect theme

  // If authorization is still being checked, return a loading indicator
  if (isAuthorized === null) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {isAuthorized ? <RouterStack /> : <CreateAccount />}
    </NavigationContainer>
  );
};


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
