import React, { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import { HeaderBack } from '../../components/header';
import { HashtagButton, RadiusButton } from '../../components/button';

import { getPostsById } from '../../config/api/PostAPI';
import { createRoom } from '../../config/api/ChatAPI';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { DotModal } from '../../components/modal';
import { io } from 'socket.io-client';
import { set } from 'react-native-reanimated';

export default function ReadPost({ navigation, route }) {
  const postId = route.params.postId;

  const [ready, setReady] = useState(false);
  const [post, setPost] = useState({});
  const [myid, setMyid] = useState('');
  const [userId, setUserId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      const result = await getPostsById(postId);
      const id = await AsyncStorage.getItem('myid');
      setPost(result);
      setUserId(result.user._id);
      setMyid(id);
      setReady(true);
    });
  }, [navigation]);

  const showApplyButton = () => {
    if (post.status == false) {
      return <RadiusButton title={'모집이 마감되었습니다.'} status={false} />;
    } else if (myid == userId) {
      return (
        <RadiusButton
          title={'모집 마감하기'}
          status={true}
          doFunction={async () => {
            await createRoom(navigation, post._id, post.user._id);
          }}
        />
      );
    } else {
      return (
        <RadiusButton
          title={'채팅으로 신청하기'}
          status={true}
          doFunction={async () => {
            await createRoom(navigation, post._id, post.user._id);
          }}
        />
      );
    }
  };

  const showdotModal = () => {
    if (myid == userId) {
      return (
        <MaterialCommunityIcons
          name="dots-vertical"
          size={28}
          color="black"
          onPress={() => {
            setModalOpen(true);
          }}
        />
      );
    }
  };
  return ready ? (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={''} />
      <ScrollView>
        <View style={styles.m_h_25}>
          {/* 해시태그 */}
          <View style={styles.hashtagRow}>
            {post.hashtag.map((title, i) => {
              return <HashtagButton feat={'read'} title={title} key={i} />;
            })}
          </View>
          <View style={styles.arrowRow}>
            {/* 제목 */}
            <Text style={styles.title}>
              {post.meeting} {post.category}
            </Text>

            {/* 수정/삭제 모달 버튼 (작성자일 때 만) */}
            {showdotModal()}
          </View>

          <DotModal
            navigation={navigation}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />

          {/* 날짜 */}
          <Text style={styles.day}>D-3</Text>
          <Text style={styles.date}>
            {post.startDate.substr(0, 16).replace('T', ' ')} ~{' '}
            {post.dueDate.substr(0, 16).replace('T', ' ')}
          </Text>
        </View>

        {/* 위치 */}
        <View style={styles.locationBox}>
          <Text style={styles.location}>서울특별시 용산구 이태원동</Text>
          <Entypo name="chevron-right" size={22} color="black" />
        </View>

        <View style={styles.m_h_25}>
          <View style={styles.divider}></View>

          {/* 주최자 */}
          <View style={styles.row}>
            <Text style={styles.label}>주최자</Text>
            <Text style={styles.tag}>{post.user.name}</Text>
            <Text style={styles.position}>
              {post.position} / {post.language}
            </Text>
          </View>

          {/* 모집 인원 */}
          <View style={styles.row}>
            <Text style={styles.label}>모집 인원</Text>
            <Text style={styles.tag}>{post.personnel}명</Text>
          </View>

          {/* 참가자 */}
          <View style={styles.row}>
            <Text style={styles.label}>참가자</Text>
            <View style={styles.arrowRow}>
              <Text style={styles.tag}>{post.participants.length}명</Text>
              <Entypo name="chevron-right" size={22} color="black" />
            </View>
          </View>

          {/* 모집 분류 */}
          <View style={styles.row}>
            <Text style={styles.label}>모집 분류</Text>
            <Text style={styles.tag}>{post.category}</Text>
          </View>
        </View>

        {/* 소개글 */}
        <View style={styles.m_h_25}>
          <Text style={[styles.label, { marginVertical: 10 }]}>소개글</Text>
        </View>
        <View style={styles.descBox}>
          <Text style={styles.desc}>{post.content}</Text>
        </View>

        {/* 신청 버튼 */}
        <View style={styles.m_h_25}>{showApplyButton()}</View>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={'모집글 상세'} />
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  m_h_25: {
    marginHorizontal: 25,
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: getStatusBarHeight(),
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ECEEF1',
    marginVertical: 10,
  },

  arrowRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  hashtagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },

  day: {
    color: '#484848',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  locationBox: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FB',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  location: {
    fontWeight: 'bold',
  },

  name: {
    width: '30%',
    fontSize: 15,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  label: {
    width: '30%',
    color: '#646970',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tag: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  position: {
    color: '#8E9297',
    marginStart: 15,
  },

  descBox: {
    backgroundColor: '#F8F9FB',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  desc: {
    color: '#000',
    marginBottom: 10,
  },
});
