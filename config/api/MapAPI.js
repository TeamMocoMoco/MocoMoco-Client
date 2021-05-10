import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const host = 'http://3.34.137.188';

export async function getPostsByLocation(sw, ne) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts/map',
      params: {
        sw: sw,
        ne: ne,
      },
    });

    return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}
