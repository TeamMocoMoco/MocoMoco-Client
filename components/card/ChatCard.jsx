import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import moment from 'moment';

import { getColor } from '../../styles/styles';

const diviceWidth = Dimensions.get('window').width;

export default function ChatCard({ navigation, userId, room }) {
  const [lastPress, setLastPress] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setLastPress(false);
    }, 1000);
    return () => clearInterval(id);
  }, [lastPress]);

  const back = () => {
    if (!lastPress) {
      setLastPress(true);
      navigation.push('ChatRoom', {
        roomId: room._id,
        userName: showName(),
      });
    }
  };

  const showName = () => {
    if (userId == room.admin._id) {
      return room.participant.name;
    } else {
      return room.admin.name;
    }
  };

  const showProfileImage = () => {
    let image;
    let role;
    if (userId == room.admin._id) {
      image = room.participant.userImg;
      role = room.participant.role;
    } else {
      image = room.admin.userImg;
      role = room.admin.role;
    }

    let pickColor;
    let iconName;
    switch (role) {
      case '기획자':
        pickColor = getColor('pmColor');
        iconName = 'ellipse';
        break;
      case '디자이너':
        pickColor = getColor('designerColor');
        iconName = 'triangle-sharp';
        break;
      case '개발자':
        pickColor = getColor('developerColor');
        iconName = 'md-square-sharp';
        break;
    }

    return (
      <>
        <Ionicons name={iconName} size={15} color={pickColor} />
        <Image
          source={{ uri: image }}
          style={[styles.profileImage, { borderColor: pickColor }]}
        />
      </>
    );
  };

  if (room.admin != null && room.participant != null) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          back();
        }}
      >
        {/* 프로필사진 */}
        {showProfileImage()}

        <View style={styles.textContainer}>
          {/* 이름, 채팅온시간 */}
          <View style={styles.header}>
            <Text style={styles.name}>{showName()}</Text>
            <Text style={styles.time}>
              {moment(room.createdAt).format('hh:mm')}
            </Text>
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
  profileImage: {
    resizeMode: 'cover',
    height: diviceWidth * 0.15,
    width: diviceWidth * 0.15,
    borderRadius: 100,
    borderWidth: 3,
    marginLeft: 7,
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
