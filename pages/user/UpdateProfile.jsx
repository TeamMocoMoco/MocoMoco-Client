import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';

import { HeaderProfile } from '../../components/header';
import { getColor } from '../../styles/styles';

import { patchUserInfo } from '../../config/api/UserAPI';

import * as ImagePicker from 'expo-image-picker';

export default function UpdateProfile({ navigation, route }) {
  const userinfo = route.params.user;

  const [name, setName] = useState(userinfo.name);
  const [introduce, setIntroduce] = useState(userinfo.introduce);
  const [imgUri, setImgUri] = useState(userinfo.userImg);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          '갤러리에 접근할 수 없습니다.',
          'MocoMoco 앱 설정에서 저장공간 권한을 허용해주세요. ',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '앱 설정',
              onPress: async () => {
                await Linking.openSettings();
              },
              style: 'default',
            },
          ]
        );
      } else {
        let imageData = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });

        setImgUri(imageData.uri);
      }
    }
  };

  const update = async () => {
    if (name == '') {
      Alert.alert('이름을 입력해 주세요!');
      return;
    }
    const formData = new FormData();
    formData.append('img', {
      uri: imgUri,
      name: 'image.jpg',
      type: 'multipart/form-data',
    });
    formData.append('name', name);
    formData.append('introduce', introduce);

    await patchUserInfo(navigation, formData);
  };

  return (
    <View style={styles.container}>
      <HeaderProfile
        title={'프로필 편집'}
        navigation={navigation}
        update={update}
      />

      <ScrollView style={styles.content}>
        {/* 프로필 */}
        <TouchableOpacity onPress={() => pickImage()} style={styles.imageBox}>
          <View style={styles.imgFrame}>
            <Image
              style={styles.img}
              source={{
                uri: imgUri,
              }}
            />
          </View>
          <Text style={styles.changeText}>프로필 사진 변경</Text>
        </TouchableOpacity>

        {/* 이름 */}
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={{ fontSize: 18 }}
              placeholder={'이지은'}
              maxLength={5}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
          </View>
        </View>

        {/* 설명 */}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              padding: 20,
              borderWidth: 1,
              borderColor: getColor('inactiveBorderColor'),
              borderRadius: 4,
              width: '90%',
            }}
          >
            <TextInput
              style={[styles.textarea, introduce == '' ? { opacity: 0.4 } : {}]}
              placeholder={
                'ex)\n👋안녕하세요 저는 개발자 이지은 입니다.\n🌎현재 저는 서울에 거주중이에요!\n👨‍💻클라이언트 개발자로 열심히 성장중입니다.\n⌨Python, JavaScript를 주로 사용해요.\nReact Native를 사용해서 앱을 만들고있습니다.\n깃허브가 궁금하시면 아래를 참고해주세요!\nhttps://github.com/hyeonginju'
              }
              placeholderTextColor={'#111'}
              value={introduce}
              textAlignVertical="top"
              onChangeText={(text) => {
                setIntroduce(text);
              }}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </ScrollView>
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
  imageBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  changeText: { fontSize: 17 },
  inputBox: {
    width: '90%',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  imgFrame: {
    width: 100,
    height: 100,
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
  textarea: {
    fontSize: 15,
    height: 250,
  },
  nameBox: { flexDirection: 'row', marginLeft: 20, alignItems: 'center' },
  nameText: { fontSize: 23, fontWeight: 'bold' },
  roleText: { fontSize: 15, color: 'grey', marginLeft: 5 },
});
