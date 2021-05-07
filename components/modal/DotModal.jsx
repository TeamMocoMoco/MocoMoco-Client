import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Text,
  Touchable,
} from 'react-native';
const pickerWidth = Dimensions.get('window').width * 0.8;

import { deletePosts } from '../../config/api/PostAPI';

export default function DotModal({
  navigation,
  modalOpen,
  setModalOpen,
  post,
}) {
  const doDelete = async () => {
    await deletePosts(navigation, post._id);
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
          marginTop: 140,
          marginRight: 30,
        }}
        onPressOut={() => {
          setModalOpen(false);
        }}
      >
        <View
          style={{
            width: 200,
            height: 150,
            backgroundColor: 'white',
            elevation: 3,
          }}
          onPressOut={() => {
            setModalOpen(false);
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalOpen(false);
            }}
          >
            <Text>close</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ margin: 20, borderWidth: 1 }}
            onPress={() => {
              navigation.push('UpdatePost', post);
              setModalOpen(false);
            }}
          >
            <Text>수정하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ margin: 20, borderWidth: 1 }}
            onPress={() => {
              {
                doDelete();
              }
            }}
          >
            <Text>삭제하기</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({});
