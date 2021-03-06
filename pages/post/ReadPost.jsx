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

  // ???????????? ????????? ???, ???????????? ??????
  const checkLogin = async () => {
    const token = await SecureStore.getItemAsync('usertoken');
    if (token == null) {
      Alert.alert('????????? ????????? ???????????????.', '?????????????????????????', [
        {
          text: '???',
          onPress: () => navigation.push('Verification'),
          style: 'default',
        },
        {
          text: '?????????',
          style: 'cancel',
        },
      ]);
    } else {
      await createRoom(navigation, post._id, post.user._id, post.user.name);
    }
  };

  // ??????????????? ?????? ?????? ??????
  const showLocation = () => {
    if (post.meeting == '????????????') {
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

  // ??????/????????????/??????????????? ??????
  const showApplyButton = () => {
    if (!post.status) {
      return <RadiusButton title={'????????? ?????????????????????.'} status={status} />;
    } else if (myid == userId) {
      return (
        <RadiusButton
          title={'?????? ????????????'}
          status={true}
          doFunction={async () => {
            Alert.alert('????????? ?????????????????????????', '', [
              {
                text: '???',
                onPress: () => {
                  closePost(navigation, post._id);
                  setStatus(false);
                },
                style: 'default',
              },
              {
                text: '?????????',
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
            title={'???????????? ??????????????????.'}
            status={true}
            doFunction={() => {
              checkLogin();
            }}
          />
        );
      } else {
        return (
          <RadiusButton
            title={'???????????? ????????????'}
            status={true}
            doFunction={() => {
              checkLogin();
            }}
          />
        );
      }
    }
  };

  // ????????? ??????/?????? ??????
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

  // D-day ?????? ??????
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
          {/* ?????? */}
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{post.title}</Text>
            </View>

            {/* ??????/?????? ?????? ?????? (???????????? ??? ???) */}
            <View style={{ marginBottom: 15 }}>{showdotModal()}</View>
          </View>

          <DotModal
            navigation={navigation}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            post={post}
          />

          {/* ?????? */}
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.day}>{getDday()}</Text>
            <Text style={styles.date}>
              {moment(startDate).format('YYYY??? MM??? DD???')} ~{' '}
              {moment(dueDate).format('YYYY??? MM??? DD???')}
            </Text>
          </View>
        </View>

        {/* ?????? */}
        {showLocation()}

        <View style={styles.m_h_25}>
          <View style={styles.divider}></View>

          {/* ????????? */}
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Text style={styles.label}>?????????</Text>

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

          {/* ?????? ?????? */}
          <View style={styles.row}>
            <Text style={styles.label}>?????? ??????</Text>

            <Text style={styles.tag}>{post.personnel}???</Text>
          </View>

          {/* ????????? */}
          <View style={styles.row}>
            <Text style={styles.label}>?????????</Text>
            <View style={styles.arrowRow}>
              <Text style={styles.tag}>{post.participants.length}???</Text>
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

          {/* ?????? ?????? */}
          <View style={styles.row}>
            <Text style={styles.label}>?????? ??????</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{post.meeting}</Text>
            </View>
            <Text style={styles.tag}>{post.category}</Text>
          </View>
        </View>

        {/* ?????? */}
        <View style={styles.m_h_25}>
          <Text style={[styles.label, { marginVertical: 10 }]}>??????</Text>
        </View>
        <View style={styles.descBox}>
          <Text style={styles.desc}>{post.content}</Text>
        </View>

        <View style={{ marginHorizontal: 25, marginTop: 15 }}>
          {/* ???????????? */}
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

        {/* ?????? ?????? */}
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
  },
  upbottom: {
    marginBottom: 15,
  },
  goParticipantIcon: {
    paddingHorizontal: 10,
  },
});
