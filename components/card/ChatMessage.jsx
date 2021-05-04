import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ChatMessage({ user, message, time }) {
  return (
    <View style={styles.container}>
      <View style={{ width: '70%' }}>
        <View style={styles.card}>
          <Text>{message}</Text>
        </View>
        <Text style={{ textAlign: 'right', marginRight: '5%' }}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: '3%',
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#D17CFE',
  },
});
