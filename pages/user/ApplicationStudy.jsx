import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ActivityIndicator, StyleSheet, View, FlatList } from 'react-native';

import { MainCard } from '../../components/card';
import { StudyTabButton } from '../../components/button';
import { getColor } from '../../styles/styles';
import { HeaderChat } from '../../components/header';

import { getJoiningPosts, getJoinedPosts } from '../../config/api/PostAPI';

export default function ApplicationStudy({ navigation }) {
  const pageNum = useRef(1);
  const flatListRef = useRef();

  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('모집중');

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        setReady(false);
        download(tab);
        setReady(true);
      });
    });
  }, [navigation]);

  const download = useCallback(async (title) => {
    pageNum.current = 1;
    setTab(title);
    let result = [];
    if (title == '모집중') {
      result = await getJoiningPosts(pageNum.current);
    } else {
      result = await getJoinedPosts(title, pageNum.current);
    }
    setPosts(result);
  });

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, y: 0 });
  };

  return ready ? (
    <View style={styles.container}>
      <HeaderChat name={'신청 스터디'} navigation={navigation} />
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {['모집중', '모집완료'].map((title, i) => {
          return (
            <StudyTabButton
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
            if (tab == '모집중') {
              nextPosts = await getJoiningPosts(pageNum.current + 1);
            } else {
              nextPosts = await getJoinedPosts(tab, pageNum.current + 1);
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
      <HeaderChat name={'신청 스터디'} navigation={navigation} />

      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        <StudyTabButton
          title={'모집중'}
          state={tab}
          setState={setTab}
          download={download}
        />
        <StudyTabButton
          title={'모집 완료'}
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
  },
  content: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 25,
  },
});
