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

import { landingImage } from '../../assets/images';
import { getColor } from '../../styles/styles';

const diviceWidth = Dimensions.get('window').width;

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 앱 이름 */}
        <Text style={styles.logoTitle}>MOCO{'\n'}MOCO</Text>

        {/* 사진 */}
        <View style={styles.logoImgBox}>
          <Image
            source={landingImage}
            style={styles.logoImg}
            resizeMode={'contain'}
          />
        </View>

        <View style={styles.bottomWrap}>
          {/* 설명 */}
          <Text style={styles.descTitle}>코린이들을 위한 스터디 플랫폼</Text>
          <Text style={styles.descContents}>
            기획자, 개발자, 디자이너를{'\n'}모코모코에서 간편하게 만나자!
          </Text>

          {/* 버튼 */}
          <TouchableOpacity
            onPress={() => navigation.push('TabNavigator')}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>로그인 없이 스터디 구경하기</Text>
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
  bottomWrap: {
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  descTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  descContents: {
    fontSize: 14,
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
