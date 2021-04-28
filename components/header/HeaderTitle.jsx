import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function HeaderTitle({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 25,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    borderBottomWidth: 0.1,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
});
