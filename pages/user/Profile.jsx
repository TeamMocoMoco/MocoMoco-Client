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

import { HeaderProfile } from '../../components/header';
import { SettingModal } from '../../components/modal';

export default function Profile({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);

  const imageUpload = () => {};
  return (
    <View style={styles.container}>
      <HeaderProfile title={'프로필 수정'} navigation={navigation} />
      <SettingModal
        navigation={navigation}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />

      <View style={styles.content}>
        {/* 프로필 */}
        <TouchableOpacity style={styles.profileBox}>
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

        <TouchableOpacity onPress={imageUpload} style={{ alignSelf: 'center' }}>
          <View
            style={{
              width: 100,
              height: 50,
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>사진업로드</Text>
          </View>
        </TouchableOpacity>

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
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
