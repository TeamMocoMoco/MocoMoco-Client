import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { SearchBar } from '../../components/input';
import { MainCard } from '../../components/card';
import { TabButton } from '../../components/button';

import data from '../../config/mock/posts.json';

export default function MainList({ navigation }) {
  const posts = data.result;

  const [tab, setTab] = useState('전체보기');

  return (
    <View style={styles.container}>
      <SearchBar />

      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        <TabButton title={'전체보기'} state={tab} setState={setTab} />
        <TabButton title={'온라인'} state={tab} setState={setTab} />
        <TabButton title={'오프라인'} state={tab} setState={setTab} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {posts.map((post, i) => {
            return <MainCard navigation={navigation} post={post} key={i} />;
          })}
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
    marginTop: getStatusBarHeight(),
    paddingTop: 20,
    paddingHorizontal: 25,
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
