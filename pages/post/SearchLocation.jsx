import React, { useCallback, useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { SearchBar } from '../../components/input';

import { getLocation } from '../../config/api/MapAPI';

export default function MainList({ navigation }) {
  const [ready, setReady] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        download();
        setReady(true);
      });
    });
  }, [navigation]);

  const download = useCallback(async () => {
    setTab(title);
    let result = [];
    result = await getLocations();
    setPosts(result);
  });

  return ready ? (
    <View style={styles.container}>
      {/* 검색창 */}
      <SearchBar />

      {/* 검색한 주소 목록 */}
      <View style={styles.content}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={(post) => {
            return (
              <MainCard
                navigation={navigation}
                post={post.item}
                key={post.item._id}
              />
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.FAB}
        onPress={() => {
          checkLogin();
        }}
      >
        <Entypo name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <SearchBar />
      <ActivityIndicator size="small" color="#0000ff" />
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
});
