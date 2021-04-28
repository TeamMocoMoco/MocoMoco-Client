import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from '../../components/input/SearchBar';

export default function MainList() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.content}>
        <Text>Main</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
});
