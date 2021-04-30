import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
const diviceWidth = Dimensions.get('window').width;

import { HeaderTitle } from '../../components/header';
import { ChatCard } from '../../components/card';

export default function ChatList() {
  return (
    <View style={styles.container}>
      <HeaderTitle title={'채팅'} />
      <ScrollView style={styles.content}>
        <ChatCard
          img={
            'https://image.news1.kr/system/photos/2020/5/29/4215665/article.jpg/dims/optimize'
          }
          name={'이지은'}
          time={'12:45 PM'}
          message={'유애나 1인 팬미팅 이벤트에 당첨돼셨습니다!'}
        />

        <ChatCard
          img={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyG3hj3pNFDgvIWM0xAaMeec4Vozhl1HLK1g&usqp=CAU'
          }
          name={'징쨩'}
          time={'12:55 PM'}
          message={'뭐해??'}
        />

        <ChatCard
          img={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5qdcXrcwuq26jH1ulyo5nbb7EduSVz-pXeg&usqp=CAU'
          }
          name={'아이유'}
          time={'07:33 PM'}
          message={'라일락~!'}
        />
      </ScrollView>
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
