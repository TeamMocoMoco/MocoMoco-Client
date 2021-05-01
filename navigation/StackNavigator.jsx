import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SignUp,
  Verification,
  VerificationConfirm,
  Location,
  Starting,
} from '../pages/start';
import TabNavigator from './TabNavigator';
import { SubList, CreatePost, ReadPost, UpdatePost } from '../pages/post';
import { ChatRoom } from '../pages/chat';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen
        name="VerificationConfirm"
        component={VerificationConfirm}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Starting" component={Starting} /> */}

      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="SubList" component={SubList} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="ReadPost" component={ReadPost} />
      <Stack.Screen name="UpdatePost" component={UpdatePost} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
