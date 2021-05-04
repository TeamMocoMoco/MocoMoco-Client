import React, { useCallback, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { Picker } from '@react-native-picker/picker';
import { ProgressBar, Colors } from 'react-native-paper';

import { HeaderBack } from '../../../components/header';
import { FullButton, OnAndOffButton } from '../../../components/button';

import kind from '../../../config/mock/category.json';
import { postPosts } from '../../../config/PostAPI';

export default function CreatePostFirst({ navigation }) {
  const categoryList = kind.category;

  const [onAndOff, setOnAndOff] = useState('');
  const [category, setCategory] = useState('선택');
  const [personnel, setPersonnel] = useState(0);

  const upload = async () => {
    await postPosts(navigation, onAndOff, category, personnel);
  };

  const showSubmitButton = () => {
    if (category == '선택' || personnel == '') {
      return <FullButton title={'저장하고 다음으로'} empty={true} />;
    } else {
      return (
        <FullButton
          title={'작성 완료'}
          empty={false}
          doFunction={() => upload()}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={'모집글 작성'} />
      {/* 진행도 현황 */}
      <ProgressBar progress={0.25} color={Colors.black} />
      <ScrollView>
        <View style={styles.content}>
          {/* 온/오프라인 */}
          <Text style={styles.serviceComment}>
            진행 방식을{'\n'}선택해주세요
          </Text>
          <View style={{ width: '100%', marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              {['오프라인', '온라인'].map((title, i) => {
                return (
                  <OnAndOffButton
                    title={title}
                    onAndOff={onAndOff}
                    setOnAndOff={setOnAndOff}
                    key={i}
                  />
                );
              })}
            </View>
            {/* {message()} */}
          </View>

          {/* 주소 */}
          <View>
            <Text style={styles.serviceComment}>주소</Text>
            <TouchableOpacity style={styles.adressBox}>
              <Text>예) 대전시 유성구 노은동</Text>
            </TouchableOpacity>
          </View>

          {/* 모집분류 */}
          <Text style={styles.serviceComment}>
            모집분류와 모집인원을{'\n'}선택해주세요.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 2, marginEnd: 20 }}>
              <Text style={styles.label}>모집 분류</Text>
            </View>
            <View
              style={{
                flex: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: '#CBCBCB',
              }}
            >
              <Picker
                mode="dropdown"
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
              >
                {categoryList.map((item, i) => {
                  return <Picker.Item label={item} value={item} key={i} />;
                })}
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 2, marginEnd: 20 }}>
              <Text style={styles.label}>모집 인원</Text>
            </View>
            <View
              style={{
                flex: 5,
                flexDirection: 'row',
                marginEnd: '20%',
                alignItems: 'center',
              }}
            >
              {/* 마이너스 버튼 */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#EBEBEB',
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  if (personnel > 0) {
                    setPersonnel(personnel - 1);
                  }
                }}
              >
                <Entypo name="minus" size={12} color="#777" />
              </TouchableOpacity>

              {/* 모집인원 */}
              <Text
                style={{
                  flex: 1,
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {personnel}
              </Text>

              {/* 플러스 버튼 */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#EBEBEB',
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setPersonnel(personnel + 1);
                }}
              >
                <Entypo name="plus" size={12} color="#777" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {showSubmitButton()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: '5%',
  },
  label: {
    color: '#263238',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  picker: {
    backgroundColor: '#FFF0E0',
    flex: 1,
    minHeight: 28,
  },
  pickerItem: {
    color: 'red',
    height: 44,
    fontSize: 20,
  },
  serviceComment: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: 'black',
  },
  adressBox: {
    borderWidth: 1,
    borderRadius: 30,
    padding: '3%',
    marginBottom: '5%',
  },
});
