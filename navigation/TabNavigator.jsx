import React from 'react';
import Platform from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

import TabTopNavigator from './TabTopNavigator';
import { MapView } from '../pages/post';
import { ChatList } from '../pages/chat';
import { MyPage } from '../pages/user';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          let iconKind = '';

          if (route.name === 'TabTopNavigator') {
            iconKind = 'SimpleLineIcons';
            iconName = 'list';
          } else if (route.name === 'MapView') {
            iconKind = 'Ionicons';
            iconName = 'map-outline';
          } else if (route.name === 'ChatList') {
            iconKind = 'Ionicons';
            iconName = 'chatbox-outline';
          } else if (route.name === 'MyPage') {
            iconKind = 'Ionicons';
            iconName = 'person-outline';
          }

          if (iconKind === 'SimpleLineIcons') {
            return (
              <SimpleLineIcons
                name={iconName}
                color={focused ? '#ED6653' : '#777'}
                size={24}
              />
            );
          } else if (iconKind === 'Ionicons') {
            return (
              <Ionicons
                name={iconName}
                color={focused ? '#ED6653' : '#777'}
                size={24}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#FFF',
          borderTopColor: '#EEE',
          height: '8%',
        },
      }}
    >
      <Tabs.Screen name="TabTopNavigator" component={TabTopNavigator} />
      <Tabs.Screen name="MapView" component={MapView} />
      <Tabs.Screen name="ChatList" component={ChatList} />
      <Tabs.Screen name="MyPage" component={MyPage} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
