import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { HeaderBack } from '../../components/header';
import { MainCard } from '../../components/card';

import {
  getPostsByKeyword,
  getPostsByMeetingByKeyword,
} from '../../config/api/PostAPI';

import { getColor } from '../../styles/styles';

export default function SubList({ navigation, route }) {
  const keyword = route.params.value;
  const meeting = route.params.tab;

  const pageNum = useRef(1);
  const flatListRef = useRef();

  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        setReady(false);
        download(meeting);
        setReady(true);
      });
    });
  }, [navigation]);

  const download = useCallback(async (title) => {
    pageNum.current = 1;
    let result = [];
    if (title == '전체보기') {
      result = await getPostsByKeyword(keyword, pageNum.current);
    } else {
      result = await getPostsByMeetingByKeyword(
        meeting,
        keyword,
        pageNum.current
      );
    }
    setPosts(result);
  });

  return ready ? (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput disabled style={styles.input} value={keyword} />
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
      <View style={styles.inputContainer}>
        <TextInput disabled style={styles.input} value={keyword} />
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
