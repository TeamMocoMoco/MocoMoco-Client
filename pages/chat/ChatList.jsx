import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HeaderTitle } from '../../components/header';
import { ChatCard } from '../../components/card';

import { getColor } from '../../styles/styles';
import { getMyRooms } from '../../config/api/ChatAPI';

export default function ChatList({ navigation }) {
  const myid = useRef();

  const [ready, setReady] = useState(false);
  const [rooms, setRooms] = useState([]);

  const keyExtractor = useCallback((item) => item._id, []);
  const renderItem = useCallback(
    (room) => (
      <ChatCard
        navigation={navigation}
        userId={myid.current}
        room={room.item}
        admin={room.item.admin}
        key={room.item._id}
      />
    ),
    []
  );

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        const result = await getMyRooms();
        setRooms(result.rooms);
        myid.current = await AsyncStorage.getItem('myid');
        setReady(true);
      });
    });
  }, []);

  return ready ? (
    <View style={styles.container}>
      <HeaderTitle title={'채팅'} />
      <FlatList
        data={rooms}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <HeaderTitle title={'채팅'} />
      <ActivityIndicator size="small" color={getColor('defaultColor')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    padding: 10,
  },
});
