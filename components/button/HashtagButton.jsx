import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function HashtagButton({ feat, title, index, onRemove }) {
  if (feat == 'create') {
    return (
      <View disabled style={styles.container}>
        <Text style={styles.title}># {title}</Text>
        <TouchableOpacity
          style={{ marginStart: 5, paddingHorizontal: 5 }}
          onPress={() => {
            onRemove(index);
          }}
        >
          <Ionicons name="close" size={12} color="#818181" />
        </TouchableOpacity>
      </View>
    );
  } else if (feat == 'read') {
    return (
      <View disabled style={styles.container}>
        <Text style={styles.title}># {title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FB',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginEnd: 10,
    marginVertical: 6,
    borderRadius: 5,
    alignItems: 'center',
  },
  title: {
    color: '#818181',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
