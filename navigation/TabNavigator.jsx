import React from 'react';
import Platform, { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

import { MainList, SearchMap } from '../pages/post';
import { ChatList } from '../pages/chat';
import { MyPage } from '../pages/user';

import { getColor } from '../styles/styles';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          let iconKind = '';
          let iconLabel = '';

          if (route.name === 'MainList') {
            iconKind = 'SimpleLineIcons';
            iconName = 'compass';
            iconLabel = '탐색';
          } else if (route.name === 'SearchMap') {
            iconKind = 'Ionicons';
            iconName = 'map-outline';
            iconLabel = '내 근처';
          } else if (route.name === 'ChatList') {
            iconKind = 'Ionicons';
            iconName = 'chatbox-outline';
            iconLabel = '채팅';
          } else if (route.name === 'MyPage') {
            iconKind = 'Ionicons';
            iconName = 'person-outline';
            iconLabel = '마이페이지';
          }

          if (iconKind === 'SimpleLineIcons') {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <SimpleLineIcons
                  name={iconName}
                  color={focused ? getColor('defaultColor') : '#CBCBCB'}
                  size={28}
                />
                <Text
                  style={[
                    styles.label,
                    focused
                      ? { color: getColor('defaultColor') }
                      : { color: '#CBCBCB' },
                  ]}
                >
                  {iconLabel}
                </Text>
              </View>
            );
          } else if (iconKind === 'Ionicons') {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons
                  name={iconName}
                  color={focused ? getColor('defaultColor') : '#CBCBCB'}
                  size={24}
                />
                <Text
                  style={[
                    styles.label,
                    focused
                      ? { color: getColor('defaultColor') }
                      : { color: '#CBCBCB' },
                  ]}
                >
                  {iconLabel}
                </Text>
              </View>
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#FFF',
          height: 60,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen name="MainList" component={MainList} />
      <Tabs.Screen name="SearchMap" component={SearchMap} />
      <Tabs.Screen name="ChatList" component={ChatList} />
      <Tabs.Screen name="MyPage" component={MyPage} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
    marginTop: 5,
  },
});
