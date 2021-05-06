import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ChatMessage({ leader, user, message, createdAt }) {
  const time = createdAt;

  if (leader == user) {
    return (
      <View style={styles.row}>
        {/* 메세지 박스 */}
        <View style={styles.leader_message}>
          <Text style={{ color: '#FFF' }}>{message}</Text>
        </View>
        {/* 시간 */}
        <Text style={styles.time}>{time}</Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.row, { justifyContent: 'flex-end' }]}>
        {/* 시간 */}
        <Text style={styles.time}>{time}</Text>
        {/* 메세지 박스 */}
        <View style={styles.user_message}>
          <Text>{message}</Text>
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
  leader_message: {
    maxWidth: '70%',
    padding: '3%',
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  user_message: {
    maxWidth: '70%',
    padding: '3%',
    borderRadius: 5,
    backgroundColor: '#FFF',
    justifyContent: 'flex-end',
  },
  time: {
    fontSize: 10,
    textAlign: 'right',
    marginHorizontal: '3%',
    alignSelf: 'flex-end',
  },
});
