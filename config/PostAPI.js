import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const host = 'http://3.34.137.188';

export async function getPosts() {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts',
    });

    console.log(response.data.result);
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function getPostsOnline(category) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts/online',
      params: {
        category: category,
      },
    });

    console.log(response.data.result);
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function getPostsOffline(category) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts/offline',
      params: {
        category: category,
      },
    });

    console.log(response.data.result);
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function getPostsById(postId) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts/' + postId,
    });

    console.log(response.data.result);
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function postPosts(
  navigation,
  onAndOff,
  title,
  category,
  personnel,
  location,
  startDate,
  dueDate,
  position,
  language,
  intro,
  hashtagList
) {
  // const token = await SecureStore.getItemAsync('token');
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDhmYWI4ODBmYWIxNzMzMzE2ZWVmZjEiLCJpYXQiOjE2MjAwNTkwMTR9.MszJf899rROPdg-cVHYoKG8N-rBKi9ReAeIMOWfRibM'
  try {
    const response = await axios({
      method: 'post',
      url: host + '/posts',
      headers: {
        token: token,
      },
      data: {
        title: title,
        category: category,
        content: intro,
        position: position,
        language: language,
        personnel: personnel,
        hashtag: hashtagList,
        location: location,
        meeting: onAndOff,
        startDate: new Date(startDate).toISOString(),
        dueDate: new Date(dueDate).toISOString(),
      },
    });

    if(response.data.result) {
      navigation.push('TabNavigator')
    }
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function patchPosts(
  postId,
  onAndOff,
  title,
  category,
  personnel,
  location,
  startDate,
  dueDate,
  position,
  language,
  intro,
  hashtagList
) {
  const token = await SecureStore.getItemAsync('token');
  try {
    const response = await axios({
      method: 'patch',
      url: host + '/posts/' + postId,
      headers: {
        token: token,
      },
      data: {
        title: title,
        category: category,
        content: intro,
        position: position,
        language: language,
        personnel: personnel,
        hashtag: hashtagList,
        meeting: onAndOff,
        location: location,
        startDate: startDate,
        dueDate: dueDate,
      },
    });

    console.log(response.data.result);
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function deletePosts(postId) {
  const token = await SecureStore.getItemAsync('token');
  try {
    const response = await axios({
      method: 'delete',
      url: host + '/posts/' + postId,
      headers: {
        token: token,
      },
    });

    console.log(response.data.result);
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}
