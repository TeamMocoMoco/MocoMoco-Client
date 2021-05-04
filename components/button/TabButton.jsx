import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabButton({ title, state, setState }) {
  if (title == state) {
    return (
      <View style={[styles.container, { borderBottomWidth: 2 }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setState(title);
        }}
      >
        <Text style={[styles.title, { color: '#DADADA' }]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    marginEnd: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
