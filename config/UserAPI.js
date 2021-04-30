import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const host = 'http://3.35.166.243';

export async function sendSMS(phone) {
  try {
    await axios({
      method: 'post',
      url: host + '/SMS/send',
      data: {
        phone: phone,
      },
    });
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function checkSMS(phone, code) {
  try {
    const response = await axios({
      method: 'post',
      url: host + '/SMS/check',
      data: {
        phone: phone,
        generateRand: code,
      },
    });

    const token = response.data.result.phone.token;
    await SecureStore.setItemAsync('phonetoken', token);
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function register(name) {
  try {
    const token = await SecureStore.getItemAsync('phonetoken');
    const response = await axios({
      method: 'post',
      url: host + '/auth/register',
      headers: {
        phonetoken: token,
      },
      data: {
        name: name,
      },
    });

    return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function login() {
  try {
    const token = await SecureStore.getItemAsync('phonetoken');
    const response = await axios({
      method: 'post',
      url: host + '/auth/login',
      headers: {
        phonetoken: token,
      },
    });

    await SecureStore.setItemAsync('token', response.data.result.user.token);
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}
