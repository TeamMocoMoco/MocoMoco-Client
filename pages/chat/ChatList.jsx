import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  Alert,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';
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
        key={room.item._id}
      />
    ),
    []
  );

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        const token = await SecureStore.getItemAsync('usertoken');
        if (token == null) {
          Alert.alert('가입이 필요한 기능입니다.', '가입하시겠습니까?', [
            {
              text: '네',
              onPress: () => navigation.push('Verification'),
              style: 'default',
            },
            {
              text: '아니오',
              onPress: () => navigation.goBack(),
              style: 'cancel',
            },
          ]);
        } else {
          const result = await getMyRooms();
          setRooms(result.rooms);
          myid.current = await AsyncStorage.getItem('myid');
          setReady(true);
        }
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
      <ActivityIndicator
        size="large"
        color={getColor('defaultColor')}
        style={{ flex: 1, alignSelf: 'center' }}
      />
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
