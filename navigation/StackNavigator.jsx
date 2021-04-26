import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import { SignIn, SignUp } from '../pages/start';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      style={{ marginTop: getStatusBarHeight() }}
    >
      <Stack.Screen name="SingIn" component={SignIn} />
      <Stack.Screen name="SingUP" component={SignUp} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
