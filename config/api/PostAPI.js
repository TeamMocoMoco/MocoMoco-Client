import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const host = 'http://3.34.137.188';

// 전체 모집글 보기 (페이징) - 완료
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

// 전체 모집글 검색 (페이징) - 완료
export async function getPostsByKeyword(keyword, pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts',
      params: {
        keyword: keyword,
        page: pageNum,
      },
    });

    // console.log(response.data.result);
    return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

// 전체 모집글 카테고리별로 보기 (페이징)
export async function getPostsByCategory(category, pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts/online',
      params: {
        category: category,
        page: pageNum,
      },
    });

    console.log(response.data.result);
    // return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

// 온/오프라인 모집글 전체보기 (페이징) - 완료
export async function getPostsByMeeting(meeting, pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts',
      params: {
        meeting: meeting,
        page: pageNum,
      },
    });

    return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

// 온/오프라인 모집글 검색 (페이징) - 완료
export async function getPostsByMeetingByKeyword(meeting, keyword, pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts',
      params: {
        meeting: meeting,
        keyword: keyword,
        page: pageNum,
      },
    });

    // console.log(response.data.result);
    return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

// 온/오프라인 모집글 카테고리별로 보기 (페이징)
export async function getPostsByMeetingByCategory(meeting, category, pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/posts/online',
      params: {
        meeting: meeting,
        category: category,
        page: pageNum,
      },
    });

    console.log(response.data.result);
    // return response.data.result;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

// 모집글 상세보기 - 완료
export async function getPostsById(postId) {
  try {
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

// 모집글 올리기 - 완료
export async function postPosts(
  navigation,
  onAndOff,
  location,
  category,
  personnel,
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
        meeting: onAndOff,
        location: location,
        category: category,
        personnel: personnel,
        startDate: new Date(startDate).toISOString(),
        dueDate: new Date(dueDate).toISOString(),
        position: position,
        language: language,
        title: title,
        content: intro,
        hashtag: hashtagList,
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

// 모집글 수정하기 - 완료
export async function patchPosts(
  navigation,
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
  console.log(postId);
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
        location: location,
        meeting: onAndOff,
        startDate: new Date(startDate).toISOString(),
        dueDate: new Date(dueDate).toISOString(),
      },
    });

    if (response.data.result) {
      navigation.push('ReadPost', { postId });
    }
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

// 모집글 삭제하기 - 완료
export async function deletePosts(navigation, postId) {
  const token = await SecureStore.getItemAsync('usertoken');
  try {
    const response = await axios({
      method: 'delete',
      url: host + '/posts/' + postId,
      headers: {
        token: token,
      },
    });

    if (response.data.result) {
      navigation.push('TabNavigator', { postId });
    }
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}
