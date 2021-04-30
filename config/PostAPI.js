import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const host = 'http://3.35.166.243';

export async function postPosts(
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
