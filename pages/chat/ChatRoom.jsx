import React, { useEffect, useState } from 'react';
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

import { ChatHeader } from '../../components/header';
import { ChatMessage } from '../../components/card';

import { Feather } from '@expo/vector-icons';

import { getChatsByRoom } from '../../config/api/ChatAPI';

const diviceWidth = Dimensions.get('window').width;

export default function ChatRoom({ navigation, route }) {
  const roomId = route.params;

  const [ready, setReady] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTimeout(async () => {
      const result = await getChatsByRoom(roomId);
      console.log(result);
      setRoomInfo(result.roomInfo);
      setChat(result.chat);
      setReady(true);
    });
  }, [navigation]);

  const showSendButton = () => {
    if (message == '') {
      return (
        <TouchableOpacity disabled style={{ opacity: 0.4 }}>
          <Feather name="send" size={24} color="#777" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      );
    }
  };

  return ready ? (
    <View style={styles.container}>
      <ChatHeader
        name={roomInfo.admin.name}
        // img={item.userImage}
        navigation={navigation}
      />
      <FlatList
        style={styles.content}
        data={chat}
        keyExtractor={(item) => item._id}
        renderItem={(chatInfo) => {
          return (
            <ChatMessage
              leader={roomInfo.admin._id}
              user={chatInfo.item.user}
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
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#0000ff" />

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
