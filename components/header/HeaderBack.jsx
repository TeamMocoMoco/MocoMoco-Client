import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

export default function HeaderBack({ navigation, title }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity disabled>
        <AntDesign name="arrowleft" size={24} color="transparent" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#08F',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFF',
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
});
