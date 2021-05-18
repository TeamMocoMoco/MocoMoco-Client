import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
const pickerWidth = Dimensions.get('window').width * 0.8;

import { logout } from '../../config/api/UserAPI';

import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function SettingModal({
  navigation,
  modalOpen,
  setModalOpen,
  user,
}) {
  const logoutFunc = () => {
    Alert.alert('로그아웃 하시겠습니까?', '', [
      {
        text: '네',
        onPress: () => {
          setModalOpen(false);
          logout(navigation);
        },
        style: 'default',
      },
      {
        text: '아니오',
        style: 'cancel',
      },
    ]);
  };

  return (
    <Modal transparent visible={modalOpen} animationType={'fade'}>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          paddingTop: 50,
          paddingRight: 45,
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
              navigation.push('UpdateProfile', { user });
              setModalOpen(false);
            }}
          >
            <FontAwesome name="pencil-square-o" size={30} color="black" />
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
