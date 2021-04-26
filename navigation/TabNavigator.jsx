import React from 'react';
import Platform from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

import Main from '../pages/Main';
import Map from '../pages/Map';
import ChatList from '../pages/ChatList';
import MyPage from '../pages/MyPage';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          let iconKind = '';

          if (route.name === 'Main') {
            iconKind = 'SimpleLineIcons';
            iconName = 'list';
          } else if (route.name === 'Map') {
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
      <Tabs.Screen name="Main" component={Main} />
      <Tabs.Screen name="Map" component={Map} />
      <Tabs.Screen name="ChatList" component={ChatList} />
      <Tabs.Screen name="MyPage" component={MyPage} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
