import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
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

    const user = response.data.result;
    console.log(user);

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
    console.log(token);
    console.log(new_token);

    await SecureStore.deleteItemAsync('phonetoken');
    await SecureStore.setItemAsync('usertoken', new_token);
  } catch (err) {
    const error = err.response.data.err || err.message;
    console.log('login error');
    Alert.alert(error);
  }
}

export async function test() {
  const token = await SecureStore.getItemAsync('phonetoken');
  console.log(token);
}
