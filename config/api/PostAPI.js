import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const host = 'http://3.34.137.188';

export async function getPosts(pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts',
      params: {
        page: pageNum,
      },
    });
    return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function getPostsById(postId) {
  try {
    const myid = await AsyncStorage.getItem('myid');
    const response = await axios({
      method: 'get',
      url: host + '/posts/' + postId,
    });
    return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function getPostsOnline(pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts/online',
      params: {
        page: pageNum,
      },
    });

    return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function getPostsOnlineByCategory(category) {
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

export async function getPostsOffline(pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts/offline',
      params: {
        page: pageNum,
      },
    });

    return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function getPostsOfflineByCategory(category) {
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

export async function postPosts(
  navigation,
  onAndOff,
  category,
  personnel,
  location,
  startDate,
  dueDate,
  position,
  language,
  title,
  intro,
  hashtagList
) {
  const token = await SecureStore.getItemAsync('usertoken');
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

    if (response.data.result) {
      navigation.push('TabNavigator');
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
  const token = await SecureStore.getItemAsync('usertoken');
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
  const token = await SecureStore.getItemAsync('usertoken');
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
