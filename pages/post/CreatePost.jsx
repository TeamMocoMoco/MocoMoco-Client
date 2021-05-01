import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { HeaderBack } from '../../components/header';
import { SignInput } from '../../components/input';
import { HashtagButton, FullButton } from '../../components/button';

import { postPosts } from '../../config/PostAPI';
import kind from '../../config/mock/category.json';
import DatePickModal from '../../components/modal/DatePickModal';

export default function CreatePost({ navigation }) {
  const categoryList = kind.category;

  const [onAndOff, setOnAndOff] = useState('온라인');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('선택');
  const [personnel, setPersonnel] = useState('');
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
    if (hashtagList.length == 3) {
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
          setDate={setStartDate}
        />
      );
    } else {
      return (
        <DatePickModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setDate={setDueDate}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={'모집글 작성'} />
      <ScrollView>
        <View style={styles.content}>
          {/* 온/오프라인 */}

          {/* 제목 */}
          <SignInput
            label={'제목'}
            value={title}
            type={'title'}
            hint={'제목을 입력하세요.'}
            setValue={setTitle}
          />

          <View style={styles.row}>
            {/* 모집분류 */}
            <View style={{ width: '60%' }}>
              <View style={{ width: '100%', marginBottom: 20 }}>
                <Text style={styles.label}>모집 분류</Text>
                <View style={styles.inputBox}>
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
            </View>

            {/* 모집인원 */}
            <View style={{ width: '35%' }}>
              <SignInput
                label={'모집 인원'}
                value={personnel}
                type={'personnel'}
                hint={'모집 인원을 입력하세요.'}
                setValue={setPersonnel}
              />
            </View>
          </View>

          {/* 스터디 기간 */}
          <View style={styles.row}>
            {/* 시작 일시 */}
            <View style={{ width: '47.5%', marginBottom: 20 }}>
              <Text style={styles.label}>시작 일시</Text>
              <TouchableOpacity
                style={styles.inputBox}
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

            {/* 종료 일시 */}
            <View style={{ width: '47.5%', marginBottom: 20 }}>
              <Text style={styles.label}>종료 일시</Text>
              <TouchableOpacity
                style={styles.inputBox}
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
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            {hashtagList.map((tag, i) => {
              return <HashtagButton title={tag} key={i} />;
            })}
          </View>

          {/* 해시태그 */}
          <View style={styles.row}>
            <View style={{ width: '100%', paddingBottom: 20 }}>
              <Text
                style={{
                  color: '#263238',
                  fontWeight: 'bold',
                  marginVertical: 10,
                }}
              >
                해시태그
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: '80%',
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#999',
                    borderRadius: 4,
                  }}
                >
                  <TextInput
                    placeholder={'해시태그를 입력하세요.'}
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

          {showSubmitButton()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
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
    height: 44,
    color: 'red',
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
    backgroundColor: '#1EA7F8',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
