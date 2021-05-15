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
import { Recruit, Save, Application } from '../../assets/images';

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
          <View style={styles.imgFrame}>
            <Image
              style={styles.img}
              source={{
                uri: user.userImg,
              }}
            />
          </View>
          <View style={styles.nameBox}>
            <Text style={styles.nameText}>{user.name} </Text>
            <Text style={styles.roleText}>{user.role}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.studyAll}>
          <TouchableOpacity
            style={styles.studyBox}
            onPress={() => navigation.push('RecruitStudy')}
          >
            <Image source={Recruit} />
            <View style={styles.textBox}>
              <Text style={styles.cateText}>모집</Text>
              <Text style={styles.studyText}> 스터디</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.studyBox}
            onPress={() => navigation.push('ApplicationStudy')}
          >
            <Image source={Application} />
            <View style={styles.textBox}>
              <Text style={styles.cateText}>신청</Text>
              <Text style={styles.studyText}> 스터디</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.studyBox}
            onPress={() => navigation.push('SaveStudy')}
          >
            <Image source={Save} />
            <View style={styles.textBox}>
              <Text style={styles.cateText}>저장</Text>
              <Text style={styles.studyText}> 스터디</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  imgFrame: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  nameBox: { flexDirection: 'row', marginLeft: 20, alignItems: 'center' },
  nameText: { fontSize: 20, fontWeight: 'bold' },
  roleText: { fontSize: 15, color: 'grey', marginLeft: 5 },
  studyAll: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  studyBox: { alignItems: 'center' },
  textBox: { flexDirection: 'row', paddingTop: 20 },
  cateText: { fontWeight: 'bold' },
  studyText: { color: 'grey' },
  myBox: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 30,
    padding: 20,
  },
});
