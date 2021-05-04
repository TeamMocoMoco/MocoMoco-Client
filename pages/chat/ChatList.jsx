import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, View, Dimensions } from 'react-native';
const diviceWidth = Dimensions.get('window').width;

import { HeaderTitle } from '../../components/header';
import { ChatCard } from '../../components/card';
import { FlatList } from 'react-native-gesture-handler';

// 임시 데이터
const DATA = [
  {
    id: '1',
    userName: '이지은',
    userImage:
      'https://image.news1.kr/system/photos/2020/5/29/4215665/article.jpg/dims/optimize',
    messageTime: '12:45 PM',
    message: '제스트니 에스쓰리니 뭔소린지 하나도 모르겠네 젠장',
  },
  {
    id: '2',
    userName: '징쨩',
    userImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyG3hj3pNFDgvIWM0xAaMeec4Vozhl1HLK1g&usqp=CAU',
    messageTime: '11:45 PM',
    message:
      '푸르던 이바 아아암 어어어허허허어어 그 바아하아암 바하아아 하하하암',
  },
  {
    id: '3',
    userName: '아이유',
    userImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5qdcXrcwuq26jH1ulyo5nbb7EduSVz-pXeg&usqp=CAU',
    messageTime: '10:45 PM',
    message:
      '잊지마 넌 흐린 어둠 사이 왼손으로 그린 별 하나 보이니 그 유일함이 얼마나 아름다운지 말야 You are my celebrity Celebrity You are my celebrity 지쳐버린 표정 마치 전원을 꺼놓은 듯이 심장소린 too quiet 네가 가진 반짝거림 상상력, identity 까지 모조리 diet, woo 넌 모르지 아직 못다 핀 널 위해 쓰여진 오래된 사랑시',
  },
  {
    id: '4',
    userName: 'dlwldms',
    userImage:
      'https://dispatch.cdnser.be/wp-content/uploads/2017/05/20170507194402_1494086394.jpg',
    messageTime: '10:30 PM',
    message: 'pizza is so delicous. its mine',
  },
];

export default function ChatList({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderTitle title={'채팅'} />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={(item, i) => (
          <ChatCard navigation={navigation} key={i} item={item.item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    padding: 10,
  },
});
