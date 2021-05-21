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
      <View style={styles.startBox}>
        <Entypo
          name="chevron-small-left"
          size={35}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>

      <Text style={styles.headerText}>{name}</Text>

      <TouchableOpacity
        onPress={() => {
          outRoom();
        }}
        style={styles.endBox}
      >
        <Text style={styles.outText}>나가기</Text>
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
  },
  headerText: {
    flex: 5,
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  startBox: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  endBox: { flex: 1, justifyContent: 'flex-end' },
  outText: { color: '#8E9297' },
});
