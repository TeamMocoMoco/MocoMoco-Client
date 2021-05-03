import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function HashtagButton({ title, index, onRemove }) {
  return (
    <View disabled style={styles.container}>
      <Text style={styles.title}># {title}</Text>
      <TouchableOpacity
        onPress={() => {
          onRemove(index);
        }}
      >
        <Ionicons name="close" size={12} color="#818181" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FB',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
    marginEnd: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  title: {
    color: '#818181',
    fontSize: 10,
    fontWeight: 'bold',
    marginEnd: 10,
  },
});
