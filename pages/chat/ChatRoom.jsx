import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
const diviceWidth = Dimensions.get('window').width;

import { ChatHeader } from '../../components/header';
import { ChatCard } from '../../components/card';

export default function ChatRoom({ navigation, route }) {
  const name = route.params.name;
  const img = route.params.img;
  return (
    <View style={styles.container}>
      <ChatHeader title={name} img={img} navigation={navigation} />
      <ScrollView style={styles.content}></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    padding: 10,
  },
});
