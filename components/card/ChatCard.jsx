import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';

const diviceWidth = Dimensions.get('window').width;

export default function ChatCard({ navigation, room, chat, index }) {
  console.log(room);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('ChatRoom', { roomId: room._id });
      }}
    >
      <View style={styles.cardFrame}>
        {/* 프로필사진 */}
        <Image
          source={{
            uri:
              'https://image.news1.kr/system/photos/2020/5/29/4215665/article.jpg/dims/optimize',
          }}
          style={styles.img}
        />

        <View style={{ margin: 10, flex: 1 }}>
          {/* 이름, 채팅온시간 */}
          <View style={styles.textCard}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {room.admin.name}
            </Text>
            <Text>{room.createdAt.substr(11, 5)}</Text>
          </View>

          {/* 마지막온 채팅 보이기 */}
          <Text numberOfLines={1}>{chat}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardFrame: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  img: {
    resizeMode: 'cover',
    height: diviceWidth * 0.2,
    width: diviceWidth * 0.2,
    borderRadius: 100,
  },
  textCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
