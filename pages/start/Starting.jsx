import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { Goal } from '../../assets/images';

const diviceWidth = Dimensions.get('window').width;

export default function Starting({ navigation, route }) {
  const pickRole = route.params.pickRole;
  const name = route.params.name;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: diviceWidth * 0.1,
          }}
        >
          MOCO{'\n'}MOCO
        </Text>

        <Image
          source={Goal}
          style={{ marginTop: diviceWidth * 0.1, width: diviceWidth * 0.8 }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            borderWidth: 1,
            marginTop: diviceWidth * 0.1,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {' '}
            {pickRole}님,
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.push('TabNavigator')}
          style={{
            width: '100%',
            height: '8%',
            justifyContent: 'center',
            borderRadius: 8,
            backgroundColor: 'grey',
            marginTop: diviceWidth * 0.08,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            위치 등록하고 스터디 구경하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    backgroundColor: 'white',
  },
  content: {
    padding: '5%',
    alignItems: 'center',
  },
});
