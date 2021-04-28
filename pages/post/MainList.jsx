import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { SearchBar } from '../../components/input';
import { MainCard } from '../../components/card';

export default function MainList({ route }) {
  const navigation = route.navigation;
  return (
    <View style={styles.container}>
      <SearchBar />
      <ScrollView>
        <View style={styles.content}>
          <MainCard />
          <MainCard />
          <MainCard />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.FAB}
        onPress={() => {
          navigation.push('CreatePost');
        }}
      >
        <Entypo name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
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
  },
  FAB: {
    backgroundColor: '#0E4DA4',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
