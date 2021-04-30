import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';

export default function HeaderBack({ navigation, title }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={38} color="black" />
      </TouchableOpacity>
      {/* <Text style={styles.headerText}>{title}</Text> */}
      <TouchableOpacity disabled>
        <Entypo
          name="chevron-small-left"
          size={38}
          color="black"
          color="transparent"
        />
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
  },
  headerText: {
    color: '#FFF',
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
});
