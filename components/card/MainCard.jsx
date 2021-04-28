import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SmallCategoryButton, HashtagButton } from '../button';

export default function MainCard() {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.firstRow}>
        <Text style={styles.nickname}>닉네임</Text>
        <Text style={styles.date}>• 4월 24일 14:00 ~ 20:00</Text>
      </View>
      <Text style={styles.title}>파이썬 알고리즘 스터디 하실 분 모아요~</Text>
      <Text style={styles.people}>• 모집인원 : 6명</Text>
      <View style={styles.categoryRow}>
        <SmallCategoryButton title={'온라인'} />
        <SmallCategoryButton title={'알고리즘 스터디'} />
      </View>
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
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nickname: {
    width: '30%',
    fontSize: 15,
    fontWeight: 'bold',
  },
  date: {
    width: '70%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  people: {
    color: '#555',
  },
  categoryRow: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  hashtagRow: {
    flexDirection: 'row',
  },
});
