import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HashtagButton } from '../button';

export default function MainCard({ navigation, post }) {
  const startDate = post.startDate.substr(0, 10);

  const getDays = () => {
    const today = new Date();
    const d_day = new Date(startDate);

    const days = Math.floor(
      ((d_day.getTime() - today.getTime()) / 1000 / 60 / 60 + 9) / 24
    );

    if (days >= 7) {
      return `${days / 7}주일 뒤 시작`;
    } else if (days > 1) {
      return `${days}일 뒤 시작`;
    } else if (days == 1) {
      return `내일부터 시작`;
    } else if (days == 0) {
      return `오늘 마감`;
    } else if (days > -7) {
      return `${-days}일 지남`;
    } else if (days <= -7) {
      return `${-days / 7}주일 지남`;
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        const postId = post._id;
        navigation.push('ReadPost', { postId });
      }}
    >
      <Text style={styles.date}>{getDays()}</Text>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.title}>
          {post.meeting} {post.category}
        </Text>
        <Text style={styles.info}>{post.title}</Text>
      </View>
      <View style={styles.hashtagList}>
        {post.hashtag.map((title, i) => {
          return <HashtagButton feat={'read'} title={title} key={i} />;
        })}
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
    fontWeight: 'bold',
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
