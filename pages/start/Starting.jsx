import React, { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { startingImage } from '../../assets/images';

import { getColor } from '../../styles/styles';

const diviceWidth = Dimensions.get('window').width;

export default function Starting({ navigation, route }) {
  const [lastPress, setLastPress] = useState(false);
  const name = route.params.name;
  const role = route.params.pickRole;
  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        setLastPress(false);
      });
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 앱 이름 */}
        <Text style={styles.logoTitle}>MOCO{'\n'}MOCO</Text>

        {/* 사진 */}
        <View style={styles.logoImgBox}>
          <Image
            source={startingImage}
            style={styles.logoImg}
            resizeMode={'contain'}
          />
        </View>
        {/* 설명 */}
        <View style={styles.textBox}>
          <View style={styles.row}>
            <Text style={styles.descTitle}>{name}</Text>
            <Text style={styles.midText}> {role}님</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descTitle}>모코모코</Text>
            <Text style={styles.midText}>에서의 활약을 기대할게요!</Text>
          </View>
        </View>

        <View style={styles.bottomWrap}>
          {/* 버튼 */}
          <TouchableOpacity
            onPress={() => {
              if (!lastPress) {
                setLastPress(true);
                navigation.push('TabNavigator');
              }
            }}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>동료 만나러 가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    flex: 1,
    paddingVertical: diviceWidth * 0.15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  logoTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  logoImgBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '15%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: { width: '100%' },
  textBox: {
    width: '100%',
    top: 120,
    alignItems: 'center',
  },
  bottomWrap: {
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  descTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  midText: { fontSize: 18 },
  descContents: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: getColor('defaultColor'),
    width: '100%',
    paddingVertical: 13,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
