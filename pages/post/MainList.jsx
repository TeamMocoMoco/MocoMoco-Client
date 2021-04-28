import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { SearchBar } from '../../components/input';
import { MainCard } from '../../components/card';

export default function MainList() {
  return (
    <ScrollView style={styles.container}>
      <SearchBar />
      <View style={styles.content}>
        <MainCard />
        <MainCard />
        <MainCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    flex: 1,
    marginVertical: 10,
    justifyContent: 'center',
  },
});
