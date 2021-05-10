import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import { HeaderSetting } from '../../components/header';
import { SettingModal } from '../../components/modal';

import Recruit from '../../assets/Recruit.png';

export default function MyPage({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
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
      />

      <View style={styles.content}>
        {/* 프로필 */}
        <TouchableOpacity style={styles.profile}>
          <View style={styles.imgFrame}>
            <Image
              style={styles.img}
              source={{
                uri:
                  'https://image.news1.kr/system/photos/2020/5/29/4215665/article.jpg/dims/optimize',
              }}
            />
          </View>
          <View style={styles.nameBox}>
            <Text style={styles.nameText}>이지은</Text>
            <Text style={styles.roleText}>개발자</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.studyAll}>
          <TouchableOpacity style={styles.studyBox}>
            <Image source={Recruit} />
            <View style={styles.textBox}>
              <Text style={styles.cateText}>모집</Text>
              <Text style={styles.studyText}> 스터디</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.studyBox}>
            <Image source={Recruit} />
            <View style={styles.textBox}>
              <Text style={styles.cateText}>신청</Text>
              <Text style={styles.studyText}> 스터디</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.studyBox}>
            <Image source={Recruit} />
            <View style={styles.textBox}>
              <Text style={styles.cateText}>저장</Text>
              <Text style={styles.studyText}> 스터디</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.myBox}>
          <Text>hi</Text>
        </ScrollView>
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
  nameText: { fontSize: 23, fontWeight: 'bold' },
  roleText: { fontSize: 15, color: 'grey', marginLeft: 5 },
  studyAll: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  studyBox: { alignItems: 'center' },
  textBox: { flexDirection: 'row', paddingTop: 20 },
  cateText: { fontWeight: 'bold' },
  studyText: { color: 'grey' },
  myBox: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    margin: 20,
    marginTop: 30,
    padding: 20,
    height: '40%',
  },
});
