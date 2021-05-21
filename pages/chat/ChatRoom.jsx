import React, { useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { io } from 'socket.io-client';

import { HeaderChat } from '../../components/header';
import { ChatMessage } from '../../components/card';

import { Feather, Entypo, Ionicons } from '@expo/vector-icons';

import { getColor } from '../../styles/styles';
import { getChatsByRoom, postChat, deleteRoom } from '../../config/api/ChatAPI';
import { postParticipants, patchParticipants } from '../../config/api/PostAPI';

// nginx
// const SOCKET_URL = 'http://3.35.133.180/chat';

// pm2
const SOCKET_URL = 'http://15.165.163.126/chat';

export default function ChatRoom({ navigation, route }) {
  const roomId = route.params.roomId;
  const userName = route.params.userName;

  const flatListRef = useRef();

  const room = useRef();
  const chat = useRef([]);
  const participants = useRef([]);
  const myid = useRef();

  const outMessage = '상대방이 채팅방에서 나갔습니다.';

  const [ready, setReady] = useState(false);

  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');
  const [socketState, setSocketState] = useState(false);

  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');

  const [admin, setAdmin] = useState(false);
  const [participantBox, setParticipantBox] = useState(false);

  const [removeCheck, setRemoveCheck] = useState(false);

  useEffect(() => {
    // 소켓 연결 (완료)
    const socket = io(SOCKET_URL);

    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        const result = await getChatsByRoom(roomId);
        room.current = result.roomInfo;
        setRemoveCheck(result.removeCheck);

        if (room.current.post != null) {
          setPostId(room.current.post._id);
          setTitle(room.current.post.title);
        }
        chat.current = result.chat.reverse();

        if (result.participants != null) {
          participants.current = result.participants.participants;
        }
        // 해당 모집글에 참여중인 사람인지 판단
        participants.current.map((participant) => {
          if (room.current.participant._id == participant._id) {
            setStatus(true);
          }
        });

        myid.current = await AsyncStorage.getItem('myid');
        if (myid.current == room.current.admin._id) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
        setReady(true);
      });
    });
    // room._id emit (완료)
    socket.emit('connectRoom', { roomId });

    socket.on('chat', async (data) => {
      setSocketState(true);
      chat.current = [data, ...chat.current];
      setSocketState(false);
    });
  }, []);

  // 채팅방 정보 가져오기
  const download = async () => {
    const result = await getChatsByRoom(roomId);
    participants.current = result.participants.participants;
    setRemoveCheck(result.removeCheck);
    setStatus(!status);
  };

  //채팅방 나가기
  const outRoom = () => {
    Alert.alert(
      '이 게시물에서 다시 채팅을 하실 수 없습니다.',
      '채팅방을 나가시겠습니까?',
      [
        {
          text: '네',
          onPress: async () => {
            await deleteRoom(roomId);
            postChat(roomId, outMessage);
            navigation.navigate('TabNavigator');
          },
          style: 'default',
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ]
    );
  };

  // 기획/개발/디자인 도형 및 윤곽선
  const showRoleIcon = (participant) => {
    let pickColor;
    let iconName;
    switch (participant.role) {
      case '기획자':
        pickColor = getColor('pmColor');
        iconName = 'ellipse';
        break;
      case '디자이너':
        pickColor = getColor('designerColor');
        iconName = 'triangle-sharp';
        break;
      case '개발자':
        pickColor = getColor('developerColor');
        iconName = 'md-square-sharp';
        break;
    }
    return (
      <>
        <Ionicons name={iconName} size={15} color={pickColor} />
        <Image
          source={{ uri: participant.userImg }}
          style={[styles.participantImg, { borderColor: pickColor }]}
        />
      </>
    );
  };

  // 참가자 목록
  const showParticipantBox = () => {
    if (!participantBox) {
      return (
        <View style={styles.participantBox}>
          <View style={styles.row}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  title == ''
                    ? Alert.alert('삭제된 게시글입니다.')
                    : navigation.push('ReadPost', { postId });
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>
                  {title == '' ? '삭제된 게시글' : title}
                </Text>
              </TouchableOpacity>
              {/* <Text> 참가자</Text> */}
            </View>
            <TouchableOpacity style={{ paddingHorizontal: 5 }}>
              <Entypo
                name="chevron-small-down"
                size={35}
                color="black"
                onPress={() => {
                  setParticipantBox(true);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.participantBox}>
          <View style={styles.row}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  title == ''
                    ? Alert.alert('삭제된 게시글입니다.')
                    : navigation.push('ReadPost', { postId });
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>
                  {title == '' ? '삭제된 게시글' : title}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ paddingHorizontal: 5 }}>
              <Entypo
                name="chevron-small-down"
                size={35}
                color="black"
                onPress={() => {
                  setParticipantBox(false);
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.participants}>
            {participants.current.length == 0 ||
            participants.current == null ? (
              <View style={styles.participantLine}>
                <Text>참가자가 아직 없습니다.</Text>
              </View>
            ) : (
              participants.current.map((participant) => {
                return (
                  <TouchableOpacity
                    key={participant._id}
                    style={styles.participantLine}
                    onPress={() => {
                      navigation.push(
                        'OtherProfile',
                        (navigation, participant._id)
                      );
                    }}
                  >
                    {showRoleIcon(participant)}

                    <View style={styles.row}>
                      <Text style={styles.participantName}>
                        {participant.name}
                      </Text>
                      <Text style={styles.participantRole}>
                        {participant.role}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </View>
      );
    }
  };

  // 메시지 보내기 함수
  const submitChatMessage = async () => {
    await postChat(roomId, message);
    setMessage('');
  };

  // 메시지 보내기 버튼
  const showSendButton = () => {
    if (title == '') {
      return <></>;
    } else if (message == '') {
      return (
        <TouchableOpacity disabled style={styles.offSendButton}>
          <Feather name="send" size={24} color="#777" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            submitChatMessage();
          }}
          style={styles.sendButton}
        >
          <Feather name="send" size={24} color={getColor('defaultColor')} />
        </TouchableOpacity>
      );
    }
  };

  // 확정 취소 함수
  const cancleConfirm = async () => {
    await patchParticipants(
      room.current.post._id,
      room.current.participant._id
    );
    await download();
  };

  // 확정 함수
  const confirm = async () => {
    await postParticipants(room.current.post._id, room.current.participant._id);
    await download();
  };

  // 확정/확정 취소/신고 버튼
  const showConfirmButton = () => {
    // 확정 취소 or 확정하기 버튼
    return status ? (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          cancleConfirm();
        }}
      >
        <Text style={{ color: getColor('defaultColor'), fontSize: 12 }}>
          확정 취소 ❌
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          confirm();
        }}
      >
        <Text style={{ color: getColor('defaultColor'), fontSize: 12 }}>
          확정 ⭕
        </Text>
      </TouchableOpacity>
    );
  };

  //채팅방 상태에 따른 메세지 입력란
  const showMessageInput = () => {
    if (title == '') {
      return (
        <Text style={{ color: '#D00000' }}>삭제된 게시글의 채팅방입니다.</Text>
      );
    } else if (removeCheck == true) {
      return (
        <Text style={{ color: '#D00000' }}>
          상대방이 채팅방에서 나갔습니다.
        </Text>
      );
    } else {
      return (
        <TextInput
          disabled
          placeholder={'메세지를 입력하세요.'}
          style={styles.input}
        />
      );
    }
  };

  return ready ? (
    room.current.post == null ? (
      <View style={styles.container}>
        <HeaderChat navigation={navigation} name={userName} outRoom={outRoom} />
        <View style={styles.content}>
          {showParticipantBox()}
          <FlatList
            ref={(ref) => (flatListRef.current = ref)}
            contentContainerStyle={[
              styles.flatList,
              admin ? { paddingTop: 50 } : { paddingTop: 10 },
            ]}
            data={chat.current}
            inverted={-1}
            keyExtractor={(item) => item._id}
            renderItem={(chatInfo) => {
              return (
                <ChatMessage
                  receiver={myid.current}
                  sender={chatInfo.item.user}
                  message={chatInfo.item.content}
                  createdAt={chatInfo.item.createdAt.substr(11, 5)}
                  key={chatInfo.item._id}
                />
              );
            }}
          />
        </View>

        <View style={{ position: 'absolute', bottom: 0 }}>
          {/* 메세지 입력창 */}
          <View style={styles.bottomBox}>
            <View style={styles.sendBox}>{showMessageInput()}</View>
            <View>{showSendButton()}</View>
          </View>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <HeaderChat navigation={navigation} name={userName} outRoom={outRoom} />
        <View style={styles.content}>
          {showParticipantBox()}
          <FlatList
            ref={(ref) => (flatListRef.current = ref)}
            contentContainerStyle={[
              styles.flatList,
              admin ? { paddingTop: 50 } : { paddingTop: 10 },
            ]}
            data={chat.current}
            inverted={-1}
            keyExtractor={(item) => item._id}
            renderItem={(chatInfo) => {
              return (
                <ChatMessage
                  receiver={myid.current}
                  sender={chatInfo.item.user}
                  message={chatInfo.item.content}
                  createdAt={chatInfo.item.createdAt.substr(11, 5)}
                  key={chatInfo.item._id}
                />
              );
            }}
          />
        </View>

        {admin ? (
          <View style={styles.buttonContainer}>
            {showConfirmButton()}

            <TouchableOpacity style={styles.button}>
              <Text style={{ color: '#999', fontSize: 12 }}>신고 🚨</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}

        <View style={{ position: 'absolute', bottom: 0 }}>
          {/* 메세지 입력창 */}
          <View style={styles.bottomBox}>
            <View style={styles.sendBox}>
              {removeCheck == true ? (
                <Text style={{ color: '#D00000' }}>
                  상대방이 채팅방에서 나갔습니다.
                </Text>
              ) : (
                <TextInput
                  placeholder={'메세지를 입력하세요.'}
                  value={message}
                  onChangeText={(text) => {
                    setMessage(text);
                  }}
                  onSubmitEditing={() => {
                    submitChatMessage();
                  }}
                  style={styles.input}
                />
              )}
            </View>
            <View>{showSendButton()}</View>
          </View>
        </View>
      </View>
    )
  ) : (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={getColor('defaultColor')}
        style={{ flex: 1, alignSelf: 'center' }}
      />
      <View style={styles.bottomBox}>
        <View style={styles.sendBox}>
          <TextInput
            placeholder={'메시지를 입력하세요.'}
            value={message}
            onChangeText={(text) => {
              setMessage(text);
            }}
            style={styles.input}
          />
        </View>
        <View>{showSendButton()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    flex: 1,
    marginBottom: 60,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  participantBox: {
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: getColor('inactiveBorderColor'),
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  participants: {
    margin: 3,
  },
  participantLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  participantImg: {
    resizeMode: 'cover',
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    marginLeft: 7,
  },
  participantName: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  participantRole: {
    marginLeft: 5,
    color: 'grey',
    fontSize: 12,
  },
  bottomBox: {
    flexDirection: 'row',
    backgroundColor: '#EFEFF3',
    width: '100%',
    height: 60,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#EFEFF3',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sendBox: {
    backgroundColor: '#FFF',
    width: '85%',
    height: '90%',
    paddingHorizontal: '5%',
    borderColor: '#E6EAFD',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#E5E5E5',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  offSendButton: { opacity: 0.4, padding: 10 },
  sendButton: { padding: 10 },
});
