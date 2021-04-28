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
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#08F',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFF',
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
});
