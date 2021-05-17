import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { getColor } from '../../styles/styles';

export default function HeaderBackTitle({ navigation, title }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={38} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>{title}</Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={38} color="transparent" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: getColor('inactiveBorderColor'),
  },
  headerText: {
    color: 'black',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
