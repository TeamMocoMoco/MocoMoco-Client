import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

export default function HeaderBack({ navigation, title }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={35} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'right',
  },
});
