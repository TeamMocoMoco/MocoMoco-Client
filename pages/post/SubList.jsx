import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { MainCard } from '../../components/card';

import {
  getPostsByKeyword,
  getPostsByMeetingByKeyword,
} from '../../config/api/PostAPI';

import { getColor } from '../../styles/styles';
import SearchBar from '../../components/input/SearchBar';

export default function SubList({ navigation, route }) {
  const meeting = route.params.tab;

  const pageNum = useRef(1);
  const flatListRef = useRef();

  const [lastPress, setLastPress] = useState(false);
  const [ready, setReady] = useState(false);
  const [keyword, setKeyword] = useState(route.params.value);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        setReady(false);
        setLastPress(false);
        download(keyword);
        setReady(true);
      });
    });
  }, [navigation]);

  const download = useCallback(async (value) => {
    pageNum.current = 1;
    let result = [];
    if (meeting == '전체보기') {
      result = await getPostsByKeyword(value, pageNum.current);
    } else {
      result = await getPostsByMeetingByKeyword(
        meeting,
        value,
        pageNum.current
      );
    }
    setPosts(result);
  });

  const back = () => {
    if (!lastPress) {
      setLastPress(true);
      navigation.goBack();
    }
  };

  return ready ? (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ paddingVertical: 10, paddingEnd: 10 }}
          onPress={() => {
            back();
          }}
        >
          <Entypo name="chevron-small-left" size={30} color="black" />
        </TouchableOpacity>
        <SearchBar
          hint={'해시태그 또는 대표 문구를 검색하세요.'}
          keyword={route.params.value}
          doFunction={(value) => {
            download(value);
            setKeyword(value);
          }}
        />
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
            if (meeting == '전체보기') {
              nextPosts = await getPostsByKeyword(keyword, pageNum.current + 1);
            } else {
              nextPosts = await getPostsByMeetingByKeyword(
                meeting,
                keyword,
                pageNum.current + 1
              );
            }
            if (nextPosts.length != 0) {
              pageNum.current += 1;
              let allPosts = [...posts, ...nextPosts];
              setPosts(allPosts);
            }
          }}
        />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ paddingVertical: 10, paddingEnd: 10 }}
          onPress={() => {
            back();
          }}
        >
          <Entypo name="chevron-small-left" size={30} color="black" />
        </TouchableOpacity>
        <SearchBar
          hint={'해시태그 또는 대표 문구를 검색하세요.'}
          keyword={route.params.value}
          doFunction={(value) => {
            download(value);
            setKeyword(value);
          }}
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
  inputContainer: {
    backgroundColor: '#F6F7F9',
    flexDirection: 'row',
    borderRadius: 5,
    paddingVertical: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: '#777',
    marginStart: 15,
    fontSize: 14,
    flex: 1,
  },
});
