import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import { HeaderSetting } from '../../components/header';
import { SettingModal } from '../../components/modal';

import { getUserInfo } from '../../config/api/UserAPI';

import { getColor } from '../../styles/styles';
import { recruit, save, application } from '../../assets/images';

const windowWidth = Dimensions.get('window').width;

export default function MyPage({ navigation }) {
  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        setReady(false);
        const token = await SecureStore.getItemAsync('usertoken');
        if (token == null) {
          Alert.alert('가입이 필요한 기능입니다.', '가입하시겠습니까?', [
            {
              text: '네',
              onPress: () => navigation.push('Verification'),
              style: 'default',
            },
            {
              text: '아니오',
              onPress: () => navigation.goBack(),
              style: 'cancel',
            },
          ]);
        } else {
          const result = await getUserInfo();
          setUser(result);
          setReady(true);
        }
      });
    });
  }, []);

  const showProfileImage = () => {
    let pickColor;
    switch (user.role) {
      case '기획자':
        pickColor = getColor('pmColor');
        break;
      case '디자이너':
        pickColor = getColor('designerColor');
        break;
      case '개발자':
        pickColor = getColor('developerColor');
        break;
    }
    return (
      <Image
        style={[styles.profileImage, { borderColor: pickColor }]}
        source={{
          uri: user.userImg,
        }}
      />
    );
  };

  const showButtonText = (text) => {
    return (
      <View style={styles.buttonTextBox}>
        <Text style={{ fontWeight: 'bold' }}>{text}</Text>
        <Text style={{ color: 'grey' }}> 내역</Text>
      </View>
    );
  };

  const ProfileText = () => {
    if (user.introduce == '') {
      return (
        <View style={styles.introduceBox}>
          <Text>아직 소개 글이 없어요😥</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.introduceBox}>
          <Text>{user.introduce}</Text>
        </View>
      );
    }
  };

  return ready ? (
    <View style={styles.container}>
      <HeaderSetting
        title={'마이페이지'}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <SettingModal
        navigation={navigation}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        user={user}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* 프로필 */}
        <View style={styles.profileBox}>
          {showProfileImage()}

          <View style={{ flex: 1, marginLeft: 20 }}>
            <View style={styles.profileTextBox}>
              <Text style={styles.nameText}>{user.name} </Text>
              <Text style={styles.roleText}>{user.role}</Text>
            </View>

            {/* 버튼 */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.push('RecruitStudy')}
              >
                <Image source={recruit} style={styles.buttonImage} />
                {showButtonText('모집')}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.push('ApplicationStudy')}
              >
                <Image source={application} style={styles.buttonImage} />
                {showButtonText('참가')}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.push('SaveStudy')}
              >
                <Image source={save} style={styles.buttonImage} />
                {showButtonText('저장')}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.push('UpdateProfile', { user });
          }}
          style={styles.editBox}
        >
          <Text style={styles.editText}>프로필 편집</Text>
        </TouchableOpacity>

        {/* 소개글 */}
        {ProfileText()}
      </ScrollView>
    </View>
  ) : (
    <View style={styles.container}>
      <HeaderSetting
        title={'마이페이지'}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <ActivityIndicator
        size="large"
        color={getColor('defaultColor')}
        style={{ flex: 1, alignSelf: 'center' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    backgroundColor: 'white',
  },
  scrollView: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: 100,
    borderWidth: 2,
  },
  profileTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  roleText: {
    color: 'grey',
    fontSize: 15,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
  },
  buttonImage: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
  },
  buttonTextBox: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  editBox: {
    borderWidth: 1,
    marginTop: 27,
    borderColor: getColor('inactiveBorderColor'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  editText: { fontSize: 14, fontWeight: 'bold' },
  introduceBox: {
    padding: 15,
    marginVertical: 30,
    borderWidth: 1,
    borderColor: getColor('inactiveBorderColor'),
    borderRadius: 5,
  },
});
