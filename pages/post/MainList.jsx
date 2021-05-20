import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import { Entypo } from '@expo/vector-icons';

import { SearchBar } from '../../components/input';
import { MainCard } from '../../components/card';
import { TabButton } from '../../components/button';
import { getColor } from '../../styles/styles';

import { getPosts, getPostsByMeeting } from '../../config/api/PostAPI';

import { mogury } from '../../assets/images';

export default function MainList({ navigation }) {
  const pageNum = useRef(1);
  const flatListRef = useRef();
  const tabRef = useRef('전체보기');

  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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
    if (token == null) {
      Alert.alert('가입이 필요한 기능입니다.', '가입하시겠습니까?', [
        {
          text: '네',
          onPress: () => navigation.push('Verification'),
          style: 'default',
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ]);
    } else {
      navigation.push('CreatePostFirst');
    }
  };

  const download = useCallback(async (title) => {
    pageNum.current = 1;
    setTab(title);
    tabRef.current = title;
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await download(tabRef.current);
    setRefreshing(false);
  }, []);

  return ready ? (
    <View style={styles.container}>
      <Image source={mogury} style={styles.morugyImg} />
      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        <SearchBar
          hint={'해시태그 또는 한 줄 소개글을 검색하세요.'}
          keyword={''}
          doFunction={(value) => {
            navigation.push('SubList', { value, tab });
          }}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
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
          contentContainerStyle={styles.flatList}
          ref={(ref) => (flatListRef.current = ref)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        <SearchBar
          hint={'해시태그 또는 한 줄 소개글을 검색하세요.'}
          keyword={''}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
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
  },
  morugyImg: {
    height: 40,
    width: 80,
    resizeMode: 'contain',
  },
  flatList: {
    paddingBottom: 10,
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
