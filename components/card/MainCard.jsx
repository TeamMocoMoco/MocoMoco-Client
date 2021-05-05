import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HashtagButton } from '../button';

export default function MainCard({ navigation, post }) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        const postId = post._id;
        navigation.push('ReadPost', { postId });
      }}
    >
      <Text style={styles.date}>{post.startDate}</Text>
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
