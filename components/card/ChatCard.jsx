import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';

import { getColor } from '../../styles/styles';

const diviceWidth = Dimensions.get('window').width;

export default function ChatCard({ navigation, userId, room }) {
  const showName = () => {
    if (userId == room.admin._id) {
      return room.participant.name;
    } else {
      return room.admin.name;
    }
  };

  const showImg = () => {
    if (userId == room.admin._id) {
      return room.participant.userImg;
    } else {
      return room.admin.userImg;
    }
  };

  if (room.admin != null && room.participant != null) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.push('ChatRoom', {
            roomId: room._id,
            userName: showName(),
          });
        }}
      >
        {/* 프로필사진 */}
        <Image source={{ uri: showImg() }} style={styles.img} />

        <View style={styles.textContainer}>
          {/* 이름, 채팅온시간 */}
          <View style={styles.header}>
            <Text style={styles.name}>{showName()}</Text>
            <Text style={styles.time}>{room.createdAt.substr(11, 5)}</Text>
          </View>

          <View style={styles.body}>
            {/* 마지막온 채팅 보이기 */}
            {room.lastChat.map((chat) => {
              return (
                <Text numberOfLines={1} key={chat._id}>
                  {chat.content}
                </Text>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: getColor('ChatBorderColor'),
    alignItems: 'center',
  },
  img: {
    resizeMode: 'cover',
    height: diviceWidth * 0.15,
    width: diviceWidth * 0.15,
    borderRadius: 100,
  },
  textContainer: {
    flex: 1,
    height: diviceWidth * 0.15,
    marginStart: 10,
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  time: {
    color: 'grey',
    fontSize: 14,
    marginStart: 8,
  },
});
