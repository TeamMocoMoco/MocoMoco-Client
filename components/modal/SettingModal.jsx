import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Text,
  Touchable,
  Image,
} from 'react-native';
const pickerWidth = Dimensions.get('window').width * 0.8;

import { Edit } from '../../assets/images';

import { deletePosts } from '../../config/api/PostAPI';
import { logout } from '../../config/api/UserAPI';

import { MaterialIcons } from '@expo/vector-icons';

export default function SettingModal({ navigation, modalOpen, setModalOpen }) {
  const logoutFunc = () => {
    logout(navigation);
  };

  return (
    <Modal
      transparent
      visible={modalOpen}
      animationType={'fade'}
      //   onRequestClose={() => {
      //     setModalOpen(false);
      //   }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          paddingTop: 50,
          paddingRight: 25,
        }}
        onPressOut={() => {
          setModalOpen(false);
        }}
      >
        <View
          style={{
            width: 180,
            height: 130,
            backgroundColor: 'white',
            elevation: 3,
          }}
          onPressOut={() => {
            setModalOpen(false);
          }}
        >
          <TouchableOpacity
            style={styles.setBox}
            onPress={() => {
              setModalOpen(false);
            }}
          >
            <Image source={Edit} style={{ width: 30, height: 30 }} />
            <Text style={styles.setText}>프로필 수정</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.setBox} onPress={logoutFunc}>
            <MaterialIcons name="logout" size={30} color="black" />
            <Text style={styles.setText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  setText: { textAlign: 'center', fontSize: 15, marginLeft: 10 },
  setBox: {
    padding: 17,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
});
