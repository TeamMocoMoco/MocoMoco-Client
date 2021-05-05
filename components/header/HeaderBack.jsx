import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';

export default function HeaderBack({ navigation, title }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={38} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>{title}</Text>
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
  },
  headerText: {
    color: 'grey',
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
  },
});
