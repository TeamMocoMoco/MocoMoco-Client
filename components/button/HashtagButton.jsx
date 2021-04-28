import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function HashtagButton({ title }) {
  return (
    <TouchableOpacity disabled style={styles.container}>
      <Text style={styles.title}># {title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#777',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginEnd: 10,
    borderRadius: 5,
  },
  title: {
    color: '#FFF',
    fontSize: 10,
  },
});
