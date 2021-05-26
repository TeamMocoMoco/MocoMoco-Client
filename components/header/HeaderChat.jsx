import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

import { getColor } from '../../styles/styles';

import { Entypo } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const diviceWidth = Dimensions.get('window').width;

export default function HeaderChat({
  navigation,
  name,
  outRoom,
  participantInfo,
  adminInfo,
}) {
  const [lastPress, setLastPress] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setLastPress(false);
    }, 1000);
    return () => clearInterval(id);
  }, [lastPress]);

  const back = () => {
    if (!lastPress) {
      setLastPress(true);
      navigation.goBack();
    }
  };

  return participantInfo.name == name ? (
    <View style={styles.header}>
      <View style={styles.startBox}>
        <Entypo
          name="chevron-small-left"
          size={35}
          color="black"
          onPress={() => back()}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.push('OtherProfile', (navigation, participantInfo._id))
        }
        style={styles.nameBox}
      >
        <Image
          source={{ uri: participantInfo.userImg }}
          style={[styles.profileImage]}
        />
        <Text style={styles.headerText}>{name}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          outRoom();
        }}
        style={styles.endBox}
      >
        <Text style={styles.outText}>나가기</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.header}>
      <View style={styles.startBox}>
        <Entypo
          name="chevron-small-left"
          size={35}
          color="black"
          onPress={() => back()}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.push('OtherProfile', (navigation, adminInfo._id))
        }
        style={styles.nameBox}
      >
        <Image
          source={{ uri: adminInfo.userImg }}
          style={[styles.profileImage]}
        />
        <Text style={styles.headerText}>{name}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          outRoom();
        }}
        style={styles.endBox}
      >
        <Text style={styles.outText}>나가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: getColor('HeaderBorderColor'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startBox: {
    justifyContent: 'flex-start',
  },
  nameBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    resizeMode: 'cover',
    height: diviceWidth * 0.1,
    width: diviceWidth * 0.1,
    borderRadius: 100,
    marginRight: 7,
  },
  headerText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  endBox: { justifyContent: 'flex-end' },
  outText: { color: '#8E9297' },
});
