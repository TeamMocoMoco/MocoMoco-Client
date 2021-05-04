import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
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

export default function ChatRoom({ navigation, route }) {
  const [chat, setChat] = useState('');
  const item = route.params.item;

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

  return (
    <View style={styles.container}>
      <ChatHeader
        name={item.userName}
        img={item.userImage}
        navigation={navigation}
      />
      <ScrollView style={styles.content}>
        <ChatMessage message={item.message} />
      </ScrollView>
      {/* <FlatList
        data={item}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessage message={item.message} />}
      /> */}

      <View style={styles.bottomBox}>
        <View style={styles.sendBox}>
          <TextInput
            placeholder={'Write a Messages'}
            value={chat}
            onChangeText={(text) => {
              setChat(text);
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
