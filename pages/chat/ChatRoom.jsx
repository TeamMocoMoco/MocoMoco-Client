import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { io } from 'socket.io-client';

import { ChatHeader } from '../../components/header';
import { ChatMessage } from '../../components/card';

import { Feather } from '@expo/vector-icons';

import { getChatsByRoom, postChat } from '../../config/api/ChatAPI';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

const diviceWidth = Dimensions.get('window').width;

const SOCKET_URL = 'http://3.34.137.188/chat';

export default function ChatRoom({ navigation, route }) {
  const roomId = route.params.roomId;
  const userName = route.params.userName;

  const ref = useRef();
  const chat = useRef([]);
  const myid = useRef();
  // const flatlistRef = useRef();

  const [ready, setReady] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});
  const [message, setMessage] = useState('');

  const submitChatMessage = async () => {
    ref.current.emit('message', { content: message });
    await postChat(roomId, message);
    setMessage('');
    // flatlistRef.current.scrollToEnd({ animating: true });
  };

  useEffect(() => {
    // 소켓 연결 (완료)
    const socket = io(SOCKET_URL);
    ref.current = socket;

    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        const result = await getChatsByRoom(roomId);
        setRoomInfo(result.roomInfo);
        chat.current = result.chat;
        myid.current = await AsyncStorage.getItem('myid');
        // flatlistRef.current.scrollToEnd({ animating: true });
        setReady(true);
      });
    });

    // roomId emit (완료)
    socket.emit('connectRoom', { roomId: roomId });

    socket.on('chat', (data) => {
      console.log('메세지 알림');
      chat.current = [...chat.current, data];
    });
  }, []);

  const showSendButton = () => {
    if (message == '') {
      return (
        <TouchableOpacity disabled style={{ opacity: 0.4 }}>
          <Feather name="send" size={24} color="#777" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            submitChatMessage();
          }}
        >
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      );
    }
  };

  return ready ? (
    <View style={styles.container}>
      <ChatHeader
        name={userName}
        // img={item.userImage}
        navigation={navigation}
      />
      <FlatList
        // ref={flatlistRef}
        contentContainerStyle={styles.content}
        data={chat.current}
        keyExtractor={(item) => item._id}
        renderItem={(chatInfo) => {
          return (
            <ChatMessage
              receiver={myid.current}
              sender={chatInfo.item.user}
              message={chatInfo.item.content}
              createdAt={chatInfo.item.createdAt.substr(11, 5)}
              key={chatInfo.item._id}
            />
          );
        }}
      />

      <View style={styles.bottomBox}>
        <View style={styles.sendBox}>
          <TextInput
            placeholder={'메세지를 입력하세요.'}
            value={message}
            onChangeText={(text) => {
              setMessage(text);
            }}
            style={{
              fontSize: 15,
              width: '85%',
            }}
          />
          <View>{showSendButton()}</View>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator
        size="small"
        color="#0000ff"
        style={{ alignSelf: 'center' }}
      />
      <View style={styles.bottomBox}>
        <View style={styles.sendBox}>
          <TextInput
            placeholder={'Write a Messages'}
            value={message}
            onChangeText={(text) => {
              setMessage(text);
            }}
            style={{
              fontSize: 15,
              width: '85%',
            }}
          />
          <View>{showSendButton()}</View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    padding: '3%',
  },
  bottomBox: {
    padding: 10,
    width: '100%',
    height: diviceWidth * 0.18,
    backgroundColor: 'white',
  },
  sendBox: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 30,
    paddingHorizontal: '5%',
    height: '90%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
