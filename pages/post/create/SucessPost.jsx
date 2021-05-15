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

import { handsup } from '../../../assets/images';
import { getColor } from '../../../styles/styles';

const diviceWidth = Dimensions.get('window').width;

export default function SucessPost({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 앱 이름 */}
        <Text style={styles.logoTitle}>
          게시글이 성공적으로 게시되었습니다.
        </Text>

        {/* 사진 */}
        <View style={styles.logoImgBox}>
          <Image
            source={handsup}
            style={styles.logoImg}
            resizeMode={'contain'}
          />
        </View>

        <View style={styles.bottomWrap}>
          {/* 설명 */}
          <Text style={styles.descTitle}>
            조금씩 의지를 갖고 꾸준히 하다보면{'\n'}대단한 결실을 맛보게 된다.{' '}
          </Text>

          <Text style={styles.descTitle}>- 샤를 보들레드 -</Text>

          {/* 버튼 */}
          <TouchableOpacity
            onPress={() => navigation.push('TabNavigator')}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>탐색탭으로 이동</Text>
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
    paddingVertical: diviceWidth * 0.2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoImgBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '20%',
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
    fontStyle: 'italic',
    fontWeight: 'bold',
    margin: 15,
    textAlign: 'center',
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
    marginTop: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
