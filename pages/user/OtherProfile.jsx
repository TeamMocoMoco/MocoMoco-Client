import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import { HeaderBackTitle } from '../../components/header';
import { SettingModal } from '../../components/modal';
import { MainCard } from '../../components/card';
import { StudyTabButton } from '../../components/button';
import { getColor } from '../../styles/styles';

import { getOtherInfo } from '../../config/api/UserAPI';
import {
  getOtherOpenPosts,
  getOtherClosedPosts,
} from '../../config/api/PostAPI';

import { Feather } from '@expo/vector-icons';

export default function OtherProfile({ navigation, route }) {
  const OtherId = route.params;

  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({});

  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('모집중');

  const pageNum = useRef(1);
  const flatListRef = useRef();

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        setReady(false);
        const result = await getOtherInfo(OtherId);
        setUser(result);
        download(tab);
        setReady(true);
      });
    });
  }, []);

  const download = useCallback(async (title) => {
    pageNum.current = 1;
    setTab(title);
    let result = [];
    if (title == '모집중') {
      result = await getOtherOpenPosts(pageNum.current, OtherId);
    } else {
      result = await getOtherClosedPosts(pageNum.current, OtherId);
    }
    setPosts(result);
  });

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, y: 0 });
  };
  return ready ? (
    <View style={styles.container}>
      <HeaderBackTitle
        title={'프로필'}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        navigation={navigation}
      />

      <SettingModal
        navigation={navigation}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        user={user}
        navigation={navigation}
      />

      {/* 프로필 */}
      <View style={styles.profile}>
        <View style={styles.imgFrame}>
          <Image
            style={styles.img}
            source={{
              uri: user.userImg,
            }}
          />
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.nameText}>{user.name} </Text>
          <Text style={styles.roleText}>{user.role}</Text>
        </View>
      </View>

      <View style={styles.myBox}>
        <ScrollView>
          <Text>{user.introduce} </Text>
        </ScrollView>
      </View>

      <View style={styles.studyBox}>
        <View style={styles.studyHeader}>
          <Feather name="book-open" size={30} color="black" />
          <Text style={styles.studyHeaderText}>모집 스터디 내역</Text>
        </View>
      </View>

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

      <View style={styles.BottomContent}>
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
              nextPosts = await getOtherOpenPosts(
                pageNum.current + 1,
                user._id
              );
            } else {
              nextPosts = await getOtherClosedPosts(
                pageNum.current + 1,
                user._id
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
      <HeaderBackTitle
        title={'프로필'}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
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
    flex: 1,
    marginTop: getStatusBarHeight(),
    backgroundColor: 'white',
  },
  content: { padding: 10, borderBottomWidth: 1, borderColor: '#8E8E8E' },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
    marginLeft: 14,
    marginBottom: 23,
  },
  imgFrame: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  nameBox: { flexDirection: 'row', marginLeft: 20, alignItems: 'center' },
  nameText: { fontSize: 20, fontWeight: 'bold' },
  roleText: { fontSize: 15, color: 'grey', marginLeft: 5 },
  myBox: {
    borderWidth: 1,
    borderColor: getColor('inactiveBorderColor'),
    borderRadius: 5,
    marginHorizontal: 14,
    marginBottom: 10,
    padding: 20,
    height: 150,
  },
  studyBox: {
    borderTopWidth: 6,
    borderColor: '#E4E4E4',
  },
  studyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 19,
    marginLeft: 26,
    marginBottom: 4,
  },
  studyHeaderText: { fontSize: 16, fontWeight: 'bold', marginLeft: 13 },
  BottomContent: { flex: 1, marginVertical: 10, paddingHorizontal: 25 },
});
