import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { HashtagButton } from '../button';
import { pmIcon, dvIcon, dsIcon } from '../../assets/images';

import { getColor } from '../../styles/styles';

export default function MainCard({ navigation, post }) {
  const startDate = post.startDate.substr(0, 10);

  let roleName = '';
  switch (post.user.role) {
    case '기획자':
      roleName = pmIcon;
      break;
    case '디자이너':
      roleName = dsIcon;
      break;
    case '개발자':
      roleName = dvIcon;
      break;
  }

  const getDays = () => {
    const today = new Date();
    const startDate = new Date(post.startDate);
    const difference = startDate.getTime() - today.getTime();
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const Remainder = difference % (1000 * 3600 * 24);
    days = Remainder === 0 ? days : (days += 1);
    if (days >= 7) {
      return `${Math.floor(days / 7)}주일 뒤 시작`;
    } else if (days > 1) {
      return `${days}일 뒤 시작`;
    } else if (days == 1) {
      return `내일부터 시작`;
    } else if (days == 0) {
      return `오늘 마감`;
    } else if (days > -7) {
      return `${-days}일 지남`;
    } else if (days <= -7) {
      return `${Math.floor(-days / 7)}주일 지남`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoImgBox}>
        <Image
          source={roleName}
          style={styles.logoImg}
          resizeMode={'contain'}
        />
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  logoImgBox: {
    position: 'absolute',
    right: 0,
    top: '10%',
    width: 40,
    height: 39,
  },
  logoImg: { width: '100%', height: '100%' },
  cardContainer: {
    backgroundColor: '#FFF',
    width: '95%',
    padding: 14,
    marginVertical: 9,
    marginHorizontal: 5,
    borderRadius: 5,
    elevation: 5,
  },
  date: {
    color: getColor('defaultColor'),
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    color: '#212121',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  info: {
    color: '#8E9297',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  hashtagList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
