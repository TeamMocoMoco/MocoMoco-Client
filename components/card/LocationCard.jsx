import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getColor } from '../../styles/styles';

export default function LocationCard({ navigation, location, info }) {
  const [lastPress, setLastPress] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        setLastPress(false);
      });
    });
  }, [navigation]);

  const back = () => {
    if (!lastPress) {
      setLastPress(true);
      info.current = location;
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        back();
      }}
    >
      <Text style={styles.name}>{location.name}</Text>
      <View style={styles.row}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>주소</Text>
        </View>
        <Text style={styles.vicinity}>{location.vicinity}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DADADA',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: getColor('defaultColor'),
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginEnd: 5,
    borderRadius: 3,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  vicinity: {
    color: '#777E8E',
    fontSize: 14,
  },
});
