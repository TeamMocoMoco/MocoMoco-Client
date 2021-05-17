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
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import { HeaderSetting } from '../../components/header';
import { SettingModal } from '../../components/modal';

import { getUserInfo } from '../../config/api/UserAPI';

import { getColor } from '../../styles/styles';
import { recruit, save, application } from '../../assets/images';

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
        style={[styles.img, { borderColor: pickColor }]}
        source={{
          uri: user.userImg,
        }}
      />
    );
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

      <ScrollView style={styles.content}>
        {/* 프로필 */}
        <TouchableOpacity style={styles.profile}>
          {showProfileImage()}

          <View style={styles.nameBox}>
            <Text style={styles.nameText}>{user.name} </Text>
            <Text style={styles.roleText}>{user.role}</Text>
          </View>
        </TouchableOpacity>

        {/* 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('RecruitStudy')}
          >
            <Image source={recruit} style={styles.studyIcon} />
            <View style={styles.textBox}>
              <Text style={styles.cateText}>모집</Text>
              <Text style={styles.studyText}> 스터디</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('ApplicationStudy')}
          >
            <Image source={application} style={styles.studyIcon} />
            <View style={styles.textBox}>
              <Text style={styles.cateText}>신청</Text>
              <Text style={styles.studyText}> 스터디</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('SaveStudy')}
          >
            <Image source={save} style={styles.studyIcon} />
            <View style={styles.textBox}>
              <Text style={styles.cateText}>저장</Text>
              <Text style={styles.studyText}> 스터디</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 소개글 */}
        <View style={styles.myBox}>
          <View>
            <Text>{user.introduce} </Text>
          </View>
        </View>
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
  content: { padding: 10 },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
  },
  nameBox: { flexDirection: 'row', marginLeft: 20, alignItems: 'center' },
  nameText: { fontSize: 20, fontWeight: 'bold' },
  roleText: { fontSize: 15, color: 'grey', marginLeft: 5 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: { alignItems: 'center' },
  studyIcon: { width: 50, height: 50 },
  textBox: { flexDirection: 'row', paddingTop: 20 },
  cateText: { fontWeight: 'bold' },
  studyText: { color: 'grey' },
  myBox: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 30,
    padding: 15,
  },
});
