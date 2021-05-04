import React, { useCallback, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { Picker } from '@react-native-picker/picker';

import { HeaderBack } from '../../components/header';
import { SignInput } from '../../components/input';
import {
  HashtagButton,
  FullButton,
  OnAndOffButton,
} from '../../components/button';
import { DatePickModal } from '../../components/modal';

import kind from '../../config/mock/category.json';
import { postPosts } from '../../config/PostAPI';

export default function CreatePost({ navigation }) {
  const categoryList = kind.category;

  const [onAndOff, setOnAndOff] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('선택');
  const [personnel, setPersonnel] = useState(0);
  const [location, setLocation] = useState([36.7, 37.7]);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [position, setPosition] = useState('');
  const [language, setLanguage] = useState('');
  const [intro, setIntro] = useState('');
  const [hashtagList, setHashtagList] = useState([]);
  const [hashtag, setHashtag] = useState('');

  const [currentModal, setCurrentModal] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const upload = async () => {
    await postPosts(
      navigation,
      onAndOff,
      title,
      category,
      personnel,
      location,
      startDate,
      dueDate,
      position,
      language,
      intro,
      hashtagList
    );
  };

  const showAddButton = () => {
    if (hashtagList.length == 5) {
      return (
        <TouchableOpacity
          disabled
          style={[styles.buttonContainer, { opacity: 0.4 }]}
        >
          <Text style={styles.buttonText}>추가</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            setHashtagList([...hashtagList, hashtag]);
            setHashtag('');
          }}
        >
          <Text style={styles.buttonText}>추가</Text>
        </TouchableOpacity>
      );
    }
  };

  const showSubmitButton = () => {
    if (
      title == '' ||
      category == '선택' ||
      personnel == '' ||
      startDate == '' ||
      dueDate == '' ||
      position == '' ||
      language == '' ||
      intro == '' ||
      hashtagList.length == 0
    ) {
      return <FullButton title={'작성 완료'} empty={true} />;
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

  const showModal = () => {
    if (currentModal == 'start') {
      return (
        <DatePickModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setDateTime={setStartDate}
        />
      );
    } else {
      return (
        <DatePickModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setDateTime={setDueDate}
        />
      );
    }
  };

  const deleteHashtag = useCallback(async (index) => {
    let list = hashtagList;
    list.slice(index, 1);
    setHashtagList(hashtagList);
  });

  const onRemove = (idex) => (e) => {
    setHashtagList(hashtagList.filter((hashtag) => hashtag.idex !== idex));
  };

  const showSelectedHashtag = () => {
    if (hashtagList.length > 0) {
      return (
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              color: '#263238',
              fontWeight: 'bold',
              marginVertical: 10,
            }}
          >
            해시태그
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {hashtagList.map((tag, i) => {
              return (
                <HashtagButton
                  feat={'create'}
                  title={tag}
                  index={i}
                  onRemove={onRemove}
                  key={i}
                />
              );
            })}
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={'모집글 작성'} />
      <ScrollView>
        <View style={styles.content}>
          {/* 온/오프라인 */}
          <View style={{ width: '100%', marginBottom: 20 }}>
            <Text style={styles.label}>진행 방식</Text>
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

          {/* 모집분류 */}
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

          {/* 모집인원 */}
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
                  width: 30,
                  height: 30,
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
                  width: 30,
                  height: 30,
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

          {/* 시작일 */}
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 2, marginEnd: 20 }}>
              <Text style={styles.label}>시작일</Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: '#CBCBCB',
              }}
              onPress={() => {
                setCurrentModal('start');
                setModalOpen(true);
              }}
            >
              <TextInput
                style={{ color: '#111' }}
                editable={false}
                placeholder={'시작 일시를 선택하세요.'}
                placeholderTextColor={'#999'}
                value={startDate}
              />
            </TouchableOpacity>
          </View>

          {/* 종료일 */}
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 2, marginEnd: 20 }}>
              <Text style={styles.label}>종료일</Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: '#CBCBCB',
              }}
              onPress={() => {
                setCurrentModal('due');
                setModalOpen(true);
              }}
            >
              <TextInput
                style={{ color: '#111' }}
                editable={false}
                placeholder={'종료 일시를 선택하세요.'}
                placeholderTextColor={'#999'}
                value={dueDate}
              />
            </TouchableOpacity>
          </View>

          {showModal()}

          {/* 포지션 / 사용언어 */}
          <View style={styles.row}>
            <View style={{ width: '47.5%' }}>
              {/* 작성자 포지션 */}
              <SignInput
                style={{ flex: 3 }}
                label={'작성자 포지션'}
                value={position}
                type={'position'}
                hint={'작성자 포지션을 입력하세요.'}
                setValue={setPosition}
              />
            </View>

            {/* 작성자 사용 언어 */}
            <View style={{ width: '47.5%' }}>
              <SignInput
                style={{ flex: 3 }}
                label={'작성자 사용 언어'}
                value={language}
                type={'language'}
                hint={'작성자 사용 언어를 입력하세요.'}
                setValue={setLanguage}
              />
            </View>
          </View>

          {/* 제목 */}
          <SignInput
            label={'제목'}
            value={title}
            type={'title'}
            hint={'제목을 입력하세요.'}
            setValue={setTitle}
          />

          {/* 소개글 */}
          <View style={{ width: '100%', paddingBottom: 20 }}>
            <Text
              style={{
                color: '#263238',
                fontWeight: 'bold',
                marginVertical: 10,
              }}
            >
              소개글
            </Text>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 4,
              }}
            >
              <TextInput
                style={[styles.textarea, intro == '' ? { opacity: 0.4 } : {}]}
                placeholder={'소개글을 입력하세요.'}
                placeholderTextColor={'#111'}
                value={intro}
                textAlignVertical="top"
                onChangeText={(text) => {
                  setIntro(text);
                }}
                numberOfLines={5}
              />
            </View>
          </View>

          {/* 선택된 해시태그 */}
          {showSelectedHashtag()}

          {/* 해시태그 */}
          <View style={styles.row}>
            <View style={{ width: '100%', paddingBottom: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: '80%',
                    borderBottomWidth: 2,
                    borderColor: '#777',
                  }}
                >
                  <TextInput
                    placeholder={'해시태그를 입력하세요. (최대 5개)'}
                    value={hashtag}
                    onChangeText={(text) => {
                      setHashtag(text);
                    }}
                  />
                </View>
                <View style={{ width: '17%' }}>{showAddButton()}</View>
              </View>
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
    paddingHorizontal: 20,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: {
    color: '#263238',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
  },
  picker: {
    backgroundColor: '#FFF0E0',
    flex: 1,
    minHeight: 25,
  },
  pickerItem: {
    color: 'red',
    height: 44,
    fontSize: 20,
  },

  contentInputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#777',
  },
  textarea: {
    height: 150,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#777',
    padding: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
