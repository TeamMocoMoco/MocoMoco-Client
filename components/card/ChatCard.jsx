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

export default function ChatCard({ navigation, item }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('ChatRoom', item);
      }}
    >
      <View style={styles.cardFrame}>
        {/* 프로필사진 */}
        <Image
          source={{
            uri: item.userImage,
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
              {item.userName}
            </Text>
            <Text>{item.createAt}</Text>
          </View>

          {/* 마지막온 채팅 보이기 */}
          <Text numberOfLines={1}>{item.content}</Text>
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
