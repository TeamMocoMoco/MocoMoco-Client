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
  Image,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import moment from 'moment';

import { HeaderBack } from '../../components/header';
import { HashtagButton, RadiusButton } from '../../components/button';
import { DotModal } from '../../components/modal';

import { getPostsById, closePost } from '../../config/api/PostAPI';
import { createRoom } from '../../config/api/ChatAPI';
import { getColor } from '../../styles/styles';

export default function ReadPost({ navigation, route }) {
  const postId = route.params.postId;

  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [post, setPost] = useState({});
  const [myid, setMyid] = useState('');
  const [userId, setUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [status, setStatus] = useState(post.status);

  const [locationLastPress, setLocationLastPress] = useState(false);
  const [peopleLastPress, setPeopleLastPress] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        const result = await getPostsById(postId);
        setPost(result);
        setUserId(result.user._id);
        setStartDate(new Date(result.startDate));
        setDueDate(new Date(result.dueDate));

        const myId = await AsyncStorage.getItem('myid');
        setMyid(myId);
        setStatus(post.status);
        setReady(true);
      });
    });

    const id = setInterval(() => {
      setLocationLastPress(false);
      setPeopleLastPress(false);
    }, 1000);

    return () => clearInterval(id);
  }, [navigation]);

  // 채팅으로 신청할 때, 가입여부 확인
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

  // 오프라인일 경우 위치 표시
  const showLocation = () => {
    if (post.meeting == '오프라인') {
      return (
        <TouchableOpacity
          style={styles.locationBox}
          onPress={() => {
            if (!locationLastPress) {
              setLocationLastPress(true);
              navigation.push('LocationDetail', post.offLocation);
            }
          }}
        >
          <Text style={styles.location}>{post.address}</Text>
          <Entypo name="chevron-right" size={22} color="black" />
        </TouchableOpacity>
      );
    }
  };

  // 신청/모집마감/이미참여중 버튼
  const showApplyButton = () => {
    if (!post.status) {
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
      let join = false;
      post.participants.map((participant) => {
        if (myid == participant._id) {
          join = true;
        }
      });
      if (join) {
        return (
          <RadiusButton
            title={'참여중인 모집글입니다.'}
            status={true}
            doFunction={() => {
              checkLogin();
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
    }
  };

  // 게시글 수정/삭제 버튼
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

  // D-day 계산 함수
  const getDday = () => {
    const today = new Date();

    const difference = startDate.getTime() - today.getTime();
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const Remainder = difference % (1000 * 3600 * 24);
    days = Remainder === 0 ? days : days + 1;

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
          {/* 제목 */}
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{post.title}</Text>
            </View>

            {/* 수정/삭제 모달 버튼 (작성자일 때 만) */}
            <View style={{ marginBottom: 15 }}>{showdotModal()}</View>
          </View>

          <DotModal
            navigation={navigation}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            post={post}
          />

          {/* 날짜 */}
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.day}>{getDday()}</Text>
            <Text style={styles.date}>
              {moment(startDate).format('YYYY년 MM월 DD일')} ~{' '}
              {moment(dueDate).format('YYYY년 MM월 DD일')}
            </Text>
          </View>
        </View>

        {/* 위치 */}
        {showLocation()}

        <View style={styles.m_h_25}>
          <View style={styles.divider}></View>

          {/* 주최자 */}
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Text style={styles.label}>주최자</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.push('OtherProfile', (navigation, post.user._id));
              }}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Image
                source={{ uri: post.user.userImg }}
                style={styles.userImg}
              />
              <View>
                <Text style={styles.tag}>{post.user.name}</Text>
              </View>
            </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  if (!peopleLastPress) {
                    setPeopleLastPress(true);
                    navigation.push(
                      'ParticipantsList',
                      (navigation, post.participants)
                    );
                  }
                }}
                style={styles.goParticipantIcon}
              >
                <Entypo name="chevron-right" size={22} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* 모집 분류 */}
          <View style={styles.row}>
            <Text style={styles.label}>모집 분류</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{post.meeting}</Text>
            </View>
            <Text style={styles.tag}>{post.category}</Text>
          </View>
        </View>

        {/* 설명 */}
        <View style={styles.m_h_25}>
          <Text style={[styles.label, { marginVertical: 10 }]}>설명</Text>
        </View>
        <View style={styles.descBox}>
          <Text style={styles.desc}>{post.content}</Text>
        </View>

        <View style={{ marginHorizontal: 25, marginTop: 15 }}>
          {/* 해시태그 */}
          {post.hashtag.length >= 1 && (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.hashtagRow}>
                {post.hashtag.map((title, i) => {
                  return <HashtagButton feat={'read'} title={title} key={i} />;
                })}
              </View>
            </ScrollView>
          )}
        </View>

        {/* 신청 버튼 */}
        <View style={[styles.m_h_25, styles.upbottom]}>
          {showApplyButton()}
        </View>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={''} />
      <View style={styles.content}>
        <ActivityIndicator size="large" color={getColor('defaultColor')} />
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
  badge: {
    backgroundColor: '#8E8E8E',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginEnd: 10,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  userImg: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginEnd: 10,
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
  descBox: {
    backgroundColor: '#F8F9FB',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  desc: {
    color: '#000',
    marginBottom: 10,
  },
  upbottom: {
    marginBottom: 15,
  },
  goParticipantIcon: {
    paddingHorizontal: 10,
  },
});
