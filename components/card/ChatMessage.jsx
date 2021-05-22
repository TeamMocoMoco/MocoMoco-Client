import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import moment from 'moment';

import { getColor } from '../../styles/styles';

export default function ChatMessage({ receiver, sender, message, createdAt }) {
  if (receiver != sender) {
    return (
      <View style={styles.row}>
        {/* 메세지 박스 */}
        <View style={[styles.messageContainer, styles.leader_message]}>
          <Text style={[styles.message, { color: '#000' }]}>{message}</Text>
        </View>
        {/* 시간 */}
        <Text style={styles.time}>{moment(createdAt).format('hh:mm')}</Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.row, { justifyContent: 'flex-end' }]}>
        {/* 시간 */}
        <Text style={styles.time}>{moment(createdAt).format('hh:mm')}</Text>
        {/* 메세지 박스 */}
        <View style={[styles.messageContainer, styles.user_message]}>
          <Text style={[styles.message, { color: '#FFF' }]}>{message}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  messageContainer: {
    maxWidth: '70%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  leader_message: {
    backgroundColor: '#EFEFF3',
  },
  user_message: {
    backgroundColor: getColor('defaultColor'),
    justifyContent: 'flex-end',
  },
  message: {
    fontSize: 16,
  },
  time: {
    color: 'grey',
    fontSize: 12,
    marginHorizontal: 10,
    alignSelf: 'flex-end',
  },
});
