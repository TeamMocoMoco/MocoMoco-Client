import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const host = 'http://3.34.137.188';

export async function createRoom(navigation, postId, admin, userName) {
  const token = await SecureStore.getItemAsync('usertoken');
  try {
    const response = await axios({
      method: 'post',
      url: host + '/rooms',
      headers: {
        token: token,
      },
      data: {
        postId: postId,
        admin: admin,
      },
    });

    const roomId = response.data.result;
    navigation.push('ChatRoom', { roomId: roomId, userName: userName });
  } catch (err) {
    let error = err.response.data.err || err.message;

    if (error.includes('Error: ')) {
      error = error.substr(7);
    }

    Alert.alert(error);
  }
}

export async function getChatsByRoom(roomId) {
  const token = await SecureStore.getItemAsync('usertoken');
  try {
    const response = await axios({
      method: 'get',
      url: host + '/rooms/' + roomId,
      headers: {
        token: token,
      },
    });

    return response.data.result;
  } catch (err) {
    let error = err.response.data.err || err.message;

    if (error.includes('Error: ')) {
      error = error.substr(7);
    }

    Alert.alert(error);
  }
}

export async function postChat(roomId, message) {
  const token = await SecureStore.getItemAsync('usertoken');
  try {
    const response = await axios({
      method: 'post',
      url: host + '/rooms/' + roomId + '/chat',
      headers: {
        token: token,
      },
      data: {
        content: message,
      },
    });
  } catch (err) {
    let error = err.response.data.err || err.message;

    if (error.includes('Error: ')) {
      error = error.substr(7);
    }

    Alert.alert(error);
  }
}

export async function getMyRooms() {
  const token = await SecureStore.getItemAsync('usertoken');
  try {
    const response = await axios({
      method: 'get',
      url: host + '/rooms/myroom',
      headers: {
        token: token,
      },
    });

    return response.data.result;
  } catch (err) {
    let error = err.response.data.err || err.message;

    if (error.includes('Error: ')) {
      error = error.substr(7);
    }

    Alert.alert(error);
  }
}
