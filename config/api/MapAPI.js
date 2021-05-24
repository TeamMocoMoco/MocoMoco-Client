import { Alert } from 'react-native';
import axios from 'axios';

// nginx
const host = 'http://13.124.0.54';

// pm2
// const host = 'http://15.165.163.126';

export async function getPostsByLocation(lat, log) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts/map',
      params: {
        center: lat + ',' + log,
      },
    });

    return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function getLocations(address) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts/location',
      params: {
        keyword: address,
      },
    });

    // console.log(response.data.results);
    return response.data.results;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}
