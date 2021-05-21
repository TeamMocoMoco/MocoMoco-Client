import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { getColor } from '../../styles/styles';

const windowHeight = Dimensions.get('window').height;

export default function HeaderBackTitle({ navigation, title }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={35} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>{title}</Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={35} color="transparent" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: getColor('inactiveBorderColor'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
