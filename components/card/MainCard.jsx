import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HashtagButton } from '../button';

export default function MainCard({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.push('ReadPost');
      }}
    >
      <Text style={styles.date}>3일 뒤 시작</Text>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.title}>온라인 알고리즘 스터디</Text>
        <Text style={styles.info}>소개글 시작 내용</Text>
      </View>
      <View style={styles.hashtagList}>
        <HashtagButton feat={'read'} title={'Python'} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    elevation: 3,
  },
  date: {
    color: '#8E9297',
    fontSize: 15,
  },
  title: {
    color: '#212121',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    color: '#8E9297',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hashtagList: {
    flexDirection: 'row',
  },
});
