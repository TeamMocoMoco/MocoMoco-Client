import React, { useCallback, useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';

import { HeaderTitle } from '../../components/header';
import { ChatCard } from '../../components/card';

import { getMyRooms } from '../../config/api/ChatAPI';

export default function ChatList({ navigation }) {
  const [ready, setReady] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [chats, setChats] = useState([]);

  const keyExtractor = useCallback((item) => item._id, []);
  const renderItem = useCallback(
    (room) => (
      <ChatCard
        navigation={navigation}
        room={room.item}
        // chat={chats[i]}
        key={room.item._id}
      />
    ),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      const result = await getMyRooms();
      setRooms(result.rooms);
      setChats(result.chats);
      console.log(chats);
      setReady(true);
    });
  }, [navigation]);

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
      <ActivityIndicator size="small" color="#0000ff" />
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
