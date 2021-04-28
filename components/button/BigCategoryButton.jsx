import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BigCategoryButton({ title }) {
  if (title == 'transparent') {
    return <View style={styles.transparent}></View>;
  } else {
    return (
      <TouchableOpacity style={styles.container}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  transparent: {
    flex: 1,
    marginHorizontal: 10,
  },
});
