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
const diviceWidth = Dimensions.get('window').width;

import earth from '../../assets/earth_icon.png';

export default function Location({ navigation }) {
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
          source={earth}
          style={{ marginTop: diviceWidth * 0.1, width: diviceWidth * 0.8 }}
        />

        <Text
          style={{
            fontSize: 21,
            fontWeight: 'bold',
            marginTop: diviceWidth * 0.1,
          }}
        >
          코린이들을 위한 스터디 플렛폼
        </Text>
        <Text
          style={{
            fontSize: 15,
            margin: diviceWidth * 0.05,
            textAlign: 'center',
          }}
        >
          기획자, 개발자, 디자이너를{'\n'}모코모코에서 간편하게 만나자!
        </Text>
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
