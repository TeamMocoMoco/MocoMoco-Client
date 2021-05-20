import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';

export default function HeaderProfile({ navigation, title, update }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={38} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>{title}</Text>

      <TouchableOpacity
        onPress={() => {
          update();
        }}
      >
        <Text style={styles.confirmText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  headerText: {
    color: 'black',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmText: { fontSize: 16 },
});
