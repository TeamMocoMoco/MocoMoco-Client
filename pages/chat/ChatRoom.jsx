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
const diviceWidth = Dimensions.get('window').width;

import { ChatHeader } from '../../components/header';
import { ChatMessage } from '../../components/card';

import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import { getChatsByRoom } from '../../config/api/ChatAPI';

export default function ChatRoom({ navigation, route }) {
  const roomId = route.params;

  const [ready, setReady] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTimeout(async () => {
      const result = await getChatsByRoom(roomId);
      setRoomInfo(result.roomInfo);
      setChat(result.chat);
      setReady(true);
    });
  }, [navigation]);

  const showSendButton = () => {
    if (chat == '') {
      return (
        <TouchableOpacity disabled style={{ opacity: 0.4 }}>
          <Feather name="send" size={24} color="black" />
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
      {/* <ChatHeader
        name={item.userName}
        img={item.userImage}
        navigation={navigation}
      /> */}
      <ScrollView style={styles.content}>
        {chat.map((chatInfo) => {
          return (
            <ChatMessage
              leader={roomInfo.admin}
              user={chatInfo.user}
              message={chatInfo.content}
              createdAt={chatInfo.createdAt}
              key={chatInfo._id}
            />
          );
        })}
      </ScrollView>
      {/* <FlatList
        data={item}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ChatMessage message={item.content} />}
      /> */}

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
