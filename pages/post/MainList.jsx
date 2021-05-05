import React, { useCallback, useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

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

  const download = useCallback(async (title) => {
    setTab(title);
    let result = [];
    if (title == '전체보기') {
      result = await getPosts();
    } else if (title == '온라인') {
      result = await getPostsOnline();
    } else if (title == '오프라인') {
      result = await getPostsOffline();
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
          navigation.push('CreatePostFirst');
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
