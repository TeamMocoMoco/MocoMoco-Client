import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { getColor } from '../../styles/styles';

export default function HeaderChat({ navigation, name }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={38} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{name}</Text>
      <Entypo name="chevron-small-left" size={38} color="transparent" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 15,
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
