import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import AppView from './src/components/AppView';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  useEffect(() => {
    SplashScreen.show();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    // SplashScreen.hide();
  });

  return <AppView/>;
};

const styles = StyleSheet.create({});

export default App;
