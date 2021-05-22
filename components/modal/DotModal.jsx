import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

import { deletePosts } from '../../config/api/PostAPI';

export default function DotModal({
  navigation,
  modalOpen,
  setModalOpen,
  post,
}) {
  const doDelete = () => {
    Alert.alert('게시글을 삭제하시겠습니까?', '', [
      {
        text: '네',
        onPress: () => {
          deletePosts(navigation, post._id);
          setModalOpen(false);
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
        activeOpacity={1}
        style={styles.button}
        onPressOut={() => {
          setModalOpen(false);
        }}
      >
        <View
          style={styles.modalContainer}
          onPressOut={() => {
            setModalOpen(false);
          }}
        >
          {/* 수정하기 */}
          <TouchableOpacity
            style={styles.setBox}
            onPress={() => {
              navigation.push('UpdatePost', post);
              setModalOpen(false);
            }}
          >
            <Text style={styles.setText}>수정하기</Text>
          </TouchableOpacity>

          {/* 삭제하기 (누르면 Alert뜨고 확인 누르면 실행으로 고치기) */}
          <TouchableOpacity
            style={styles.setBox}
            onPress={() => {
              {
                doDelete();
              }
            }}
          >
            <Text style={styles.setText}>삭제하기</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingTop: 90,
    paddingRight: 40,
  },
  modalContainer: {
    width: 180,
    height: 130,
    backgroundColor: 'white',
    elevation: 3,
  },
  setBox: {
    padding: 20,
  },
  setText: {
    fontSize: 15,
  },
});
