import React, { useCallback, useEffect, useRef, useState } from 'react';
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

import { Entypo } from '@expo/vector-icons';

import { SearchBar } from '../../components/input';
import { MainCard } from '../../components/card';
import { TabButton } from '../../components/button';
import { getColor } from '../../styles/styles';

import { getPosts, getPostsByMeeting } from '../../config/api/PostAPI';

export default function MainList({ navigation }) {
  const pageNum = useRef(1);
  const flatListRef = useRef();

  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('전체보기');

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        setReady(false);
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
    pageNum.current = 1;
    setTab(title);
    let result = [];
    if (title == '전체보기') {
      result = await getPosts(pageNum.current);
    } else {
      result = await getPostsByMeeting(title, pageNum.current);
    }
    setPosts(result);
  });

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, y: 0 });
  };

  return ready ? (
    <View style={styles.container}>
      <SearchBar />

      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        {['전체보기', '온라인', '오프라인'].map((title, i) => {
          return (
            <TabButton
              title={title}
              state={tab}
              download={download}
              scroll={scrollToTop}
              key={i}
            />
          );
        })}
      </View>

      <View style={styles.content}>
        <FlatList
          ref={(ref) => (flatListRef.current = ref)}
          showsVerticalScrollIndicator={false}
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
          onEndReachedThreshold={0.1}
          onEndReached={async () => {
            let nextPosts = [];
            if (tab == '전체보기') {
              nextPosts = await getPosts(pageNum.current + 1);
            } else {
              nextPosts = await getPostsByMeeting(tab, pageNum.current + 1);
            }
            if (nextPosts.length != 0) {
              pageNum.current += 1;
              let allPosts = [...posts, ...nextPosts];
              setPosts(allPosts);
            }
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

      <ActivityIndicator
        size="large"
        color={getColor('defaultColor')}
        style={{ flex: 1, alignSelf: 'center' }}
      />
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
    backgroundColor: getColor('defaultColor'),
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
