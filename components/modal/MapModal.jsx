import React from 'react';
import { StyleSheet, View, Modal, Text, FlatList } from 'react-native';

import SlidingUpPanel from 'rn-sliding-up-panel';

import { AntDesign } from '@expo/vector-icons';

import { MainCard } from '../card';

const posts = [
  {
    hashtag: ['javascript', 'nodejs'],
    location: [],
    participants: [],
    status: true,
    _id: '60923a41333d3505035bbc82',
    title: '프로그래머스 같이 하실분',
    category: '알고리즘 스터디',
    content: '하루에 10개씩 문제 푸실 분들 채팅 주세요',
    position: '백엔드',
    language: 'javascript',
    personnel: 6,
    meeting: '온라인',
    startDate: '2021-05-10T14:00:00.000Z',
    dueDate: '2021-05-13T14:00:00.000Z',
    user: {
      _id: '608fab880fab1733316eeff1',
      name: '이다은',
      role: '개발자',
    },
    createdAt: '2021-05-05T06:25:05.885Z',
    updatedAt: '2021-05-06T14:59:00.035Z',
    __v: 0,
  },
];

export default function MapModal({
  navigation,
  modalOpen,
  setModalOpen,
  where,
}) {
  return (
    <SlidingUpPanel ref={(c) => (modalOpen = c)}>
      <View style={styles.modalFrame}>
        <View style={styles.modalHeader}>
          <AntDesign
            name="arrowleft"
            size={30}
            color="white"
            onPress={() => setModalOpen(false)}
          />
          <Text style={styles.modalTopText}>{where}</Text>
          <AntDesign name="arrowleft" size={30} color="transparent" />
        </View>

        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={(post) => {
            return (
              <MainCard
                navigation={navigation}
                post={post.item}
                key={post.item._id}
              />
            );
          }}
        />
      </View>
    </SlidingUpPanel>
  );
}

const styles = StyleSheet.create({
  modalFrame: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 100,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#08F',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 60,
    padding: 15,
  },
  modalTopText: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 18,
  },
});
