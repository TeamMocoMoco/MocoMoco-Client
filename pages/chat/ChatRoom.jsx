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
  RefreshControl,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { io } from 'socket.io-client';

import { HeaderChat } from '../../components/header';
import { ChatMessage } from '../../components/card';

import { Feather } from '@expo/vector-icons';

import { getColor } from '../../styles/styles';
import { getChatsByRoom, postChat } from '../../config/api/ChatAPI';
import { postParticipants } from '../../config/api/PostAPI';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

const diviceWidth = Dimensions.get('window').width;

const SOCKET_URL = 'http://3.34.137.188/chat';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function ChatRoom({ navigation, route }) {
  // let flatListRef;
  const room = route.params.room;
  const userName = route.params.userName;

  const ref = useRef();
  const chat = useRef([]);
  const myid = useRef();

  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [message, setMessage] = useState('');
  const [socketState, setSocketState] = useState(false);

  useEffect(() => {
    // 소켓 연결 (완료)
    const socket = io(SOCKET_URL);
    ref.current = socket;

    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        const result = await getChatsByRoom(room._id);
        chat.current = result.chat;
        myid.current = await AsyncStorage.getItem('myid');
        setReady(true);
      });
    });

    // room._id emit (완료)
    socket.emit('connectRoom', { roomId: room._id });

    socket.on('chat', async (data) => {
      setSocketState(true);
      chat.current = [...chat.current, data];
      setSocketState(false);
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const submitChatMessage = async () => {
    await postChat(room._id, message);
    setMessage('');
  };

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
      <HeaderChat navigation={navigation} name={userName} />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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

      {/* 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => postParticipants(room, postId, room.participant._id)}
        >
          <Text style={{ color: getColor('defaultColor'), fontSize: 12 }}>
            확정하기 ⭕
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: '#999', fontSize: 12 }}>신고 🚨</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBox}>
        <View style={styles.sendBox}>
          <TextInput
            placeholder={'메세지를 입력하세요.'}
            value={message}
            onChangeText={(text) => {
              setMessage(text);
            }}
            style={styles.input}
          />
        </View>
        <View>{showSendButton()}</View>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={getColor('defaultColor')}
        style={{ flex: 1, alignSelf: 'center' }}
      />
      <View style={styles.bottomBox}>
        <View style={styles.sendBox}>
          <TextInput
            placeholder={'메시지를 입력하세요.'}
            value={message}
            onChangeText={(text) => {
              setMessage(text);
            }}
            style={styles.input}
          />
        </View>
        <View>{showSendButton()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    padding: 10,
  },
  bottomBox: {
    flexDirection: 'row',
    backgroundColor: '#EFEFF3',
    width: '100%',
    height: diviceWidth * 0.18,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#EFEFF3',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sendBox: {
    backgroundColor: '#FFF',
    width: '85%',
    height: '90%',
    paddingHorizontal: '5%',
    borderColor: '#E6EAFD',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#E5E5E5',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
