import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  return (
    <NavigationContainer>
      <StatusBar />
      <StackNavigator />
    </NavigationContainer>
  );
}
