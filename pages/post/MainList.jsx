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

import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Entypo } from '@expo/vector-icons';

import { SearchBar } from '../../components/input';
import { MainCard } from '../../components/card';
import { TabButton } from '../../components/button';

import {
  getPosts,
  getPostsOnline,
  getPostsOffline,
} from '../../config/api/PostAPI';

export default function MainList({ navigation }) {
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('전체보기');
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        setReady(false);
        setTab('전체보기');
        download(tab);
        setReady(true);
      });
    });
  }, [navigation]);

  const checkLogin = async () => {
    const token = await SecureStore.getItemAsync('usertoken');
    if (token != null) {
      navigation.push('CreatePostFirst');
    } else {
      Alert.alert('로그인이 필요한 기능입니다.');
      navigation.push('Verification');
    }
  };

  const download = useCallback(async (title) => {
    setTab(title);
    let result = [];
    if (title == '전체보기') {
      result = await getPosts(1);
    } else if (title == '온라인') {
      result = await getPostsOnline(1);
    } else if (title == '오프라인') {
      result = await getPostsOffline(1);
    }
    setPosts(result);
  });

  return ready ? (
    <View style={styles.container}>
      <SearchBar />

      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        <TabButton
          title={'전체보기'}
          state={tab}
          setState={setTab}
          download={download}
        />
        <TabButton title={'온라인'} state={tab} download={download} />
        <TabButton title={'오프라인'} state={tab} download={download} />
      </View>

      <View style={styles.content}>
        <FlatList
          // contentContainerStyle={styles.content}
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

      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        <TabButton
          title={'전체보기'}
          state={tab}
          setState={setTab}
          download={download}
        />
        <TabButton
          title={'온라인'}
          state={tab}
          setState={setTab}
          download={download}
        />
        <TabButton
          title={'오프라인'}
          state={tab}
          setState={setTab}
          download={download}
        />
      </View>

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
