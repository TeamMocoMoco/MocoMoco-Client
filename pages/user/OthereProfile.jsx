import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import { HeaderBackTitle } from '../../components/header';
import { SettingModal } from '../../components/modal';
import { getColor } from '../../styles/styles';
import { StudyTabButton } from '../../components/button';

import { getUserInfo } from '../../config/api/UserAPI';

import { Feather } from '@expo/vector-icons';

export default function OthereProfile({ navigation }) {
  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({});

  const pageNum = useRef(1);
  const flatListRef = useRef();

  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('모집중');

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        setReady(false);
        const result = await getUserInfo();
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
      result = await getJoiningPosts(pageNum.current);
    } else {
      result = await getJoinedPosts(pageNum.current);
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
      />
      <SettingModal
        navigation={navigation}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        user={user}
      />

      <View style={styles.content}>
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
      </View>

      <ScrollView style={styles.studyBox}>
        <View style={styles.studyHeader}>
          <Feather name="book-open" size={30} color="black" />
          <Text style={styles.studyHeaderText}>모집 스터디 내역</Text>
        </View>

        <View style={styles.BottomContainer}>
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
                  nextPosts = await getJoiningPosts(pageNum.current + 1);
                } else {
                  nextPosts = await getJoinedPosts(pageNum.current + 1);
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
      </ScrollView>
    </View>
  ) : (
    <View style={styles.container}>
      <HeaderBackTitle
        title={'마이페이지'}
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
});
