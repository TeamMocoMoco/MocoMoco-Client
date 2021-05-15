import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const host = 'http://3.34.137.188';

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

export async function checkSMS(navigation, phone, code) {
  try {
    const response = await axios({
      method: 'post',
      url: host + '/SMS/check',
      data: {
        phone: phone,
        generateRand: code,
      },
    });

    const key = Object.keys(response.data.result)[0];

    if (key == 'phone') {
      const token = response.data.result.phone.token;
      await SecureStore.setItemAsync('phonetoken', token);

      navigation.push('SignUp');
    } else if (key == 'user') {
      const token = response.data.result.user.token;
      await SecureStore.setItemAsync('usertoken', token);

      const myid = response.data.result.user._id;
      await AsyncStorage.setItem('myid', myid);
      navigation.push('TabNavigator');
    }
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function register(name, pickRole) {
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
        role: pickRole,
      },
    });

    await login();
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

    const new_token = response.data.result.user.token;
    const myid = response.data.result.user._id;

    await SecureStore.deleteItemAsync('phonetoken');
    await SecureStore.setItemAsync('usertoken', new_token);
    await AsyncStorage.setItem('myid', myid);
  } catch (err) {
    const error = err.response.data.err || err.message;
    console.log('login error');
    Alert.alert(error);
  }
}

export async function logout(navigation) {
  try {
    await SecureStore.deleteItemAsync('usertoken');
    await AsyncStorage.clear();
    Alert.alert('로그아웃!');
    navigation.push('Landing');
  } catch (err) {
    const error = err.response.data.message || err.message;
    Alert.alert(error);
  }
}

export async function getUserInfo() {
  const token = await SecureStore.getItemAsync('usertoken');
  try {
    const response = await axios({
      method: 'get',
      url: host + '/auth',
      headers: {
        token: token,
      },
    });
    return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;
    console.log('err');
    Alert.alert(error);
  }
}

export async function patchUserInfo(navigation, formData) {
  const token = await SecureStore.getItemAsync('usertoken');
  try {
    const response = await axios({
      method: 'patch',
      url: host + '/auth',
      data: formData,
      headers: {
        token: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.result) {
      navigation.goBack();
    }
  } catch (err) {
    console.log(err);
  }
}
