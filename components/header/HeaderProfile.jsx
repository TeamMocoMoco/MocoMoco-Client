import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function HeaderProfile({ navigation, title }) {
  const Modify = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity disabled>
        <Text style={{ color: 'white', fontSize: 16 }}>완료</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>{title}</Text>

      <TouchableOpacity
        onPress={() => {
          Modify();
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