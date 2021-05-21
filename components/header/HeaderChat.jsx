import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { getColor } from '../../styles/styles';

import { Entypo } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

export default function HeaderChat({ navigation, name, outRoom }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={35} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>{name}</Text>

      <TouchableOpacity
        onPress={() => {
          outRoom();
        }}
      >
        <Text>채팅방 나가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: getColor('HeaderBorderColor'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
