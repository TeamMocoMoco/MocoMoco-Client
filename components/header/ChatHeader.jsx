import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
const diviceWidth = Dimensions.get('window').width;

import { Entypo } from '@expo/vector-icons';
export default function ChatHeader({ navigation, name, img }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={38} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.profile}>
        <Image
          source={{
            uri: img,
          }}
          style={styles.img}
        />
        <Text style={styles.headerText}>{name}</Text>
        <Image />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#08F',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: diviceWidth * 0.02,
  },
  img: {
    height: diviceWidth * 0.15,
    width: diviceWidth * 0.15,
    resizeMode: 'cover',
    borderRadius: 100,
    marginLeft: diviceWidth * 0.02,
  },
  profile: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#08F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
