import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';

import { HeaderSetting } from '../../components/header';
import { SettingModal } from '../../components/modal';

export default function MyPage({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);

  const imageUpload = () => {};
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
        <TouchableOpacity onPress={imageUpload}>
          <View style={{ width: 100, height: 50, borderWidth: 1, margin: 100 }}>
            <Text>사진업로드</Text>
          </View>
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
    alignItems: 'center',
  },
});
