import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import { SignIn, SignUp } from '../pages/start';
import { SubList, CreatePost, ReadPost, UpdatePost } from '../pages/post';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SingIn" component={SignIn} />
      <Stack.Screen name="SingUP" component={SignUp} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="SubList" component={SubList} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="ReadPost" component={ReadPost} />
      <Stack.Screen name="UpdatePost" component={UpdatePost} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
