import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SmallCategoryButton, HashtagButton } from '../button';

export default function DetailCard() {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.row}>
        <Text style={styles.nickname}>닉네임</Text>
        <Text style={styles.authorInfoBox}>백엔드 개발자 / Python</Text>
      </View>
      <Text style={styles.title}>파이썬 알고리즘 스터디 하실 분 모아요~</Text>
      <View style={styles.row}>
        <Text style={styles.people}>• 모집인원 : 6명</Text>
        <Text style={styles.date}>• 4월 24일 14:00 ~ 20:00</Text>
      </View>
      <View style={[styles.row, { marginVertical: 15 }]}>
        <SmallCategoryButton title={'온라인'} />
        <SmallCategoryButton title={'알고리즘 스터디'} />
      </View>
      <Text style={styles.content}>
        {
          '줌으로 함께할 예정입니다!\n\n프로그래머스 2단계 문제 20문제 정도 풀 생각입니다.'
        }
      </Text>
      <View style={styles.hashtagRow}>
        <HashtagButton title={'Python'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 20,
    margin: 10,
    borderRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    width: '30%',
    fontSize: 15,
    fontWeight: 'bold',
  },
  authorInfoBox: {
    width: '70%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  people: {
    width: '40%',
    color: '#555',
  },
  date: {
    width: '60%',
  },
  content: {
    color: '#000',
    minHeight: 150,
  },
  hashtagRow: {
    flexDirection: 'row',
  },
});
