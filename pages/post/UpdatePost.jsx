import React, { useCallback, useState, useEffect } from 'react';
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

import { Entypo, Ionicons } from '@expo/vector-icons';

import { Picker } from '@react-native-picker/picker';

import { HeaderBack } from '../../components/header';
import {
  HashtagButton,
  FullButton,
  OnAndOffButton,
} from '../../components/button';
import { DatePickModal } from '../../components/modal';

import kind from '../../config/mock/category.json';

import { patchPosts } from '../../config/api/PostAPI';

export default function UpdatePost({ navigation, route }) {
  const post = route.params;
  console.log(post.personnel);
  const categoryList = kind.category;

  const [onAndOff, setOnAndOff] = useState(post.meeting);
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [personnel, setPersonnel] = useState(post.personnel);
  const [location, setLocation] = useState(post.location);
  const [startDate, setStartDate] = useState(post.startDate);
  const [dueDate, setDueDate] = useState(post.dueDate);
  const [position, setPosition] = useState(post.position);
  const [language, setLanguage] = useState(post.language);
  const [intro, setIntro] = useState(post.content);
  const [hashtagList, setHashtagList] = useState(post.hashtag);
  const [hashtag, setHashtag] = useState('');

  const [currentModal, setCurrentModal] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const update = async () => {
    await patchPosts(
      navigation,
      post._id,
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

  const showAdressInput = () => {
    if (onAndOff == '오프라인') {
      return (
        <View>
          <Text style={styles.serviceComment}>주소</Text>
          <TouchableOpacity style={styles.adressBox}>
            <Text>예) 대전시 유성구 노은동</Text>
            <Ionicons name="md-search-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
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
      return <FullButton title={'수정 완료'} empty={true} />;
    } else {
      return (
        <FullButton
          title={'수정 완료'}
          empty={false}
          doFunction={() => update()}
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
            {post.hashtag.map((tag, i) => {
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
      <HeaderBack navigation={navigation} title={'모집글 수정'} />
      <ScrollView>
        <View style={styles.content}>
          {/* 온/오프라인 */}
          <View style={styles.onoffBox}>
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
          </View>

          {/* 주소 */}
          {showAdressInput()}

          {/* 모집분류 */}
          <View style={styles.categoryBox}>
            <View style={styles.categoryText}>
              <Text style={styles.label}>모집 분류</Text>
            </View>
            <View style={styles.pickerBox}>
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
          <View style={styles.categoryBox}>
            <View style={{ flex: 2, marginEnd: 20 }}>
              <Text style={styles.label}>모집 인원</Text>
            </View>

            <View style={styles.mpButtonBox}>
              {/* 마이너스 버튼 */}
              <TouchableOpacity
                style={styles.mpButton}
                onPress={() => {
                  if (personnel > 0) {
                    setPersonnel(personnel - 1);
                  }
                }}
              >
                <Entypo name="minus" size={12} color="#777" />
              </TouchableOpacity>

              {/* 모집인원 */}
              <Text style={styles.personText}>{personnel}</Text>

              {/* 플러스 버튼 */}
              <TouchableOpacity
                style={styles.mpButton}
                onPress={() => {
                  setPersonnel(personnel + 1);
                }}
              >
                <Entypo name="plus" size={12} color="#777" />
              </TouchableOpacity>
            </View>
          </View>

          {/* 시작일 */}
          <View style={styles.categoryBox}>
            <View style={{ flex: 2, marginEnd: 20 }}>
              <Text style={styles.label}>시작일</Text>
            </View>
            <TouchableOpacity
              style={styles.pickerBox}
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
          <View style={styles.categoryBox}>
            <View style={{ flex: 2, marginEnd: 20 }}>
              <Text style={styles.label}>종료일</Text>
            </View>
            <TouchableOpacity
              style={styles.pickerBox}
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
          <View style={styles.column}>
            {/* 작성자 포지션 */}
            <View style={styles.inputBox}>
              <Text style={styles.tag}>나의 포지션</Text>
              <TextInput
                style={{ flex: 3, fontSize: 18 }}
                value={position}
                type={'position'}
                placeholder={'ex) 백엔드 개발자'}
                onChangeText={(text) => {
                  setPosition(text);
                }}
              />
            </View>

            {/* 작성자 사용 언어 */}
            <View style={styles.inputBox}>
              <Text style={styles.tag}>사용 언어</Text>
              <TextInput
                style={{ flex: 3, fontSize: 18 }}
                value={language}
                type={'language'}
                placeholder={'ex) Python, JS'}
                onChangeText={(text) => {
                  setLanguage(text);
                }}
              />
            </View>
          </View>

          {/* 소개글 */}
          <View style={styles.inputBox}>
            <Text style={styles.tag}>소개글</Text>
            <TextInput
              style={{ flex: 3, fontSize: 18 }}
              value={title}
              type={'title'}
              placeholder={'최대 30글자 작성 가능'}
              maxLength={30}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
          </View>

          {/* 설명 */}
          <View style={{ width: '100%', marginBottom: 20 }}>
            <Text style={styles.label}>설명</Text>
            <View style={styles.textInputBox}>
              <TextInput
                style={[styles.textarea, intro == '' ? { opacity: 0.4 } : {}]}
                placeholder={'설명을 입력하세요.'}
                placeholderTextColor={'#111'}
                value={intro}
                textAlignVertical="top"
                onChangeText={(text) => {
                  setIntro(text);
                }}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* 선택된 해시태그 */}
          {showSelectedHashtag()}

          {/* 해시태그 */}
          <View style={styles.row}>
            <View style={{ width: '100%', paddingBottom: 20 }}>
              <View style={styles.row}>
                <View style={styles.hashtagBox}>
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
    fontSize: 18,
    marginVertical: 10,
  },
  onoffBox: { width: '100%', marginBottom: 20 },
  serviceComment: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'black',
  },
  adressBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    padding: '3%',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  categoryBox: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  categoryText: { flex: 2, marginEnd: 20 },
  pickerBox: {
    flex: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#CBCBCB',
  },
  picker: {
    backgroundColor: '#FFF0E0',
    flex: 1,
    minHeight: 25,
  },
  pickerItem: {
    color: 'red',
    height: 44,
    fontSize: 18,
  },
  mpButtonBox: {
    flex: 5,
    flexDirection: 'row',
    marginEnd: '20%',
    alignItems: 'center',
  },
  mpButton: {
    backgroundColor: '#EBEBEB',
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  column: { flexDirection: 'column', marginBottom: '5%' },
  inputBox: {
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  tag: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: '3%',
    color: 'black',
  },
  textInputBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
  },
  textarea: {
    height: 150,
    fontSize: 18,
  },
  hashtagBox: {
    width: '80%',
    borderBottomWidth: 2,
    borderColor: '#777',
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
