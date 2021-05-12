import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
const pickerWidth = Dimensions.get('window').width * 0.8;

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
        onPress: () => deletePosts(navigation, post._id),
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
          paddingTop: 140,
          paddingRight: 40,
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
            style={{ padding: 20 }}
            onPress={() => {
              navigation.push('UpdatePost', post);
              setModalOpen(false);
            }}
          >
            <Text style={styles.setText}>수정하기</Text>
          </TouchableOpacity>

          {/* 삭제하기 (누르면 알러트뜨고 확인누르면 실행으로 고치기) */}
          <TouchableOpacity
            style={{ padding: 20 }}
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
  setText: { fontSize: 15 },
});
