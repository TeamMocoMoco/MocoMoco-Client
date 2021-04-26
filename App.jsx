import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);

  return (
    <NavigationContainer>
      <StatusBar />
      <StackNavigator />
    </NavigationContainer>
  );
}
