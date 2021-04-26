import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function HeaderTitle({ headerTitle }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{headerTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 25,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    borderBottomWidth: 0.1,
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
});
