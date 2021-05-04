import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ChatMessage({ message }) {
  return (
    <View style={styles.container}>
      <View style={{ width: '70%' }}>
        <View style={styles.card}>
          <Text>{message}</Text>
        </View>
        <Text style={{ textAlign: 'right', marginRight: '5%' }}>오전12:45</Text>
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
