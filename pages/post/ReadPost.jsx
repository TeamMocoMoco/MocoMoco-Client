import React, { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import { HeaderBack } from '../../components/header';
import { HashtagButton, RadiusButton } from '../../components/button';
import { DotModal } from '../../components/modal';

import { getPostsById, closePost } from '../../config/api/PostAPI';
import { createRoom } from '../../config/api/ChatAPI';

export default function ReadPost({ navigation, route }) {
  const postId = route.params.postId;

  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [post, setPost] = useState({});
  const [myid, setMyid] = useState('');
  const [userId, setUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        const result = await getPostsById(postId);
        setPost(result);
        setUserId(result.user._id);
        setStartDate(
          new Date(
            new Date(result.startDate).toLocaleString('ko-KR', {
              timeZone: 'UTC',
            })
          )
        );
        setDueDate(
          new Date(
            new Date(result.dueDate).toLocaleString('ko-KR', {
              timeZone: 'UTC',
            })
          )
        );

        const id = await AsyncStorage.getItem('myid');
        setMyid(id);
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
      await createRoom(navigation, post._id, post.user._id, post.user.name);
    }
  };

  const showLocation = () => {
    if (post.meeting == '오프라인') {
      return (
        <View style={styles.locationBox}>
          <Text style={styles.location}>{post.address}</Text>
          <Entypo name="chevron-right" size={22} color="black" />
        </View>
      );
    }
  };

  const showApplyButton = () => {
    if (post.status == false) {
      return <RadiusButton title={'모집이 마감되었습니다.'} status={status} />;
    } else if (myid == userId) {
      return (
        <RadiusButton
          title={'모집 마감하기'}
          status={true}
          doFunction={async () => {
            Alert.alert('모집을 마감하시겠습니까?', '', [
              {
                text: '네',
                onPress: () => {
                  closePost(navigation, post._id);
                  setStatus(false);
                },
                style: 'default',
              },
              {
                text: '아니오',
                style: 'cancel',
              },
            ]);
          }}
        />
      );
    } else {
      return (
        <RadiusButton
          title={'채팅으로 신청하기'}
          status={true}
          doFunction={() => {
            checkLogin();
          }}
        />
      );
    }
  };

  const showdotModal = () => {
    if (myid == post.user._id) {
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
    } else {
      return <></>;
    }
  };

  const getStudyDate = (d) => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const hour = ((d.getHours() - 1) % 12) + 1;
    const minutes = d.getMinutes() == 0 ? '' : d.getMinutes() + '분';

    return year + '년 ' + month + '월 ' + date + '일 ' + hour + '시 ' + minutes;
  };

  const getDday = () => {
    const today = new Date();

    const difference = startDate.getTime() - today.getTime();
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const Remainder = difference % (1000 * 3600 * 24);
    days = Remainder === 0 ? days : (days += 1);

    if (days > 0) {
      return `D-${days}`;
    } else if (days == 0) {
      return `D-Day`;
    } else {
      return `D+${-days}`;
    }
  };

  return ready ? (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={''} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.m_h_25}>
          {/* 해시태그 */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.hashtagRow}>
              {post.hashtag.map((title, i) => {
                return <HashtagButton feat={'read'} title={title} key={i} />;
              })}
            </View>
          </ScrollView>

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
            post={post}
          />

          {/* 날짜 */}
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.day}>{getDday()}</Text>
            <Text style={styles.date}>
              {getStudyDate(startDate)} ~ {getStudyDate(dueDate)}
            </Text>
          </View>
        </View>

        {/* 위치 */}
        {showLocation()}

        <View style={styles.m_h_25}>
          <View style={styles.divider}></View>

          {/* 주최자 */}
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <Text style={styles.label}>주최자</Text>
            <View>
              <Text style={styles.tag}>{post.user.name}</Text>
              <Text style={styles.position}>
                {post.position} / {post.language}
              </Text>
            </View>
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
              <TouchableOpacity>
                <Entypo name="chevron-right" size={22} color="black" />
              </TouchableOpacity>
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
      <HeaderBack navigation={navigation} title={''} />
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
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
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
    marginVertical: 5,
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
    marginTop: 5,
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
