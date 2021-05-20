import React, { useState, useEffect, useRef } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Entypo, Ionicons } from '@expo/vector-icons';

import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import { HeaderBack } from '../../components/header';
import {
  HashtagButton,
  FullButton,
  OnAndOffButton,
} from '../../components/button';

import kind from '../../config/mock/category.json';
import { patchPosts } from '../../config/api/PostAPI';
import { getColor } from '../../styles/styles';

export default function UpdatePost({ navigation, route }) {
  const post = route.params;
  const categoryList = kind.category;

  const [onAndOff, setOnAndOff] = useState(post.meeting);
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [personnel, setPersonnel] = useState(post.personnel);

  const [startDate, setStartDate] = useState(new Date(post.startDate));
  const [dueDate, setDueDate] = useState(new Date(post.dueDate));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [intro, setIntro] = useState(post.content);
  const [hashtagList, setHashtagList] = useState(post.hashtag);
  const [hashtag, setHashtag] = useState('');

  const [location, setLocation] = useState(post.location);
  const [address, setAddress] = useState(post.address);
  const [name, setName] = useState(post.address_name);

  const locationInfo = useRef();

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      if (locationInfo.current != null) {
        const lat = locationInfo.current.geometry.location.lat;
        const lng = locationInfo.current.geometry.location.lng;
        setLocation([lat, lng]);
        let array = locationInfo.current.vicinity.split(' ');
        array.pop();
        setAddress(array.join(' '));
        setName(locationInfo.current.name);
      }
    });
  });

  // 오프라인일 때 주소 검색 창
  const showAddressInput = () => {
    if (onAndOff == '오프라인') {
      return (
        <View>
          <Text style={styles.serviceComment}>주소</Text>
          <TouchableOpacity
            style={styles.adressBox}
            onPress={() => {
              navigation.push('SearchLocation', { info: locationInfo });
            }}
          >
            {name == '' ? (
              <Text style={{ color: '#AAA' }}>예) 스타벅스 강남</Text>
            ) : (
              <Text style={{ color: 'black' }}>{name}</Text>
            )}
            <Ionicons name="md-search-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  // 선택된 해시태그
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

  // 해시태그 추가 버튼
  const showAddButton = () => {
    if (hashtagList.length == 5) {
      return (
        <TouchableOpacity
          disabled
          style={[styles.buttonContainer, styles.inactive]}
        >
          <Text style={styles.buttonText}>추가</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.buttonContainer, styles.active]}
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

  // 해시태그 삭제 함수
  const onRemove = (index) => {
    let list = hashtagList;
    list.splice(index, 1);
    setHashtagList(list);
  };

  // 게시글 업로드 버튼
  const showSubmitButton = () => {
    if (
      title == '' ||
      category == '선택' ||
      personnel == '' ||
      startDate == '' ||
      dueDate == '' ||
      new Date(dueDate).getTime() - new Date(startDate).getTime() < 0 ||
      intro == ''
    ) {
      return <FullButton title={'수정 완료'} empty={true} />;
    } else if (
      onAndOff == '오프라인' &&
      (location == '' || address == '' || name == '')
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

  // 게시글 업로드 함수
  const update = async () => {
    await patchPosts(
      navigation,
      post._id,
      onAndOff,
      location,
      address,
      name,
      category,
      personnel,
      startDate,
      dueDate,
      title,
      intro,
      hashtagList
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} />
      <ScrollView>
        <View style={styles.content}>
          {/* 온/오프라인 */}
          <View style={styles.onoffBox}>
            <Text style={styles.label}>진행 방식</Text>
            <View style={{ flexDirection: 'row' }}>
              {['오프라인', '온라인'].map((onOff, i) => {
                return (
                  <OnAndOffButton
                    title={onOff}
                    onAndOff={onAndOff}
                    doFunction={(value) => {
                      setOnAndOff(value);
                      setLocation(post.location);
                      setAddress(post.address);
                      setName(post.address_name);
                      locationInfo.current = null;
                    }}
                    key={i}
                  />
                );
              })}
            </View>
          </View>

          {/* 주소 */}
          {showAddressInput()}

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
                <Entypo name="minus" size={18} color="white" />
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
                <Entypo name="plus" size={18} color="white" />
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
                setShowStartPicker(true);
              }}
            >
              <TextInput
                style={{ color: '#111' }}
                editable={false}
                placeholder={'시작 일시를 선택하세요.'}
                placeholderTextColor={'#999'}
                value={moment(startDate).format('YYYY년 MM월 DD일')}
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
                setShowEndPicker(true);
              }}
            >
              <TextInput
                style={{ color: '#111' }}
                editable={false}
                placeholder={'종료 일시를 선택하세요.'}
                placeholderTextColor={'#999'}
                value={moment(dueDate).format('YYYY년 MM월 DD일')}
              />
            </TouchableOpacity>
          </View>

          {/* 시작일 DatePicker */}
          {showStartPicker && !showEndPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              minimumDate={new Date()}
              mode={'date'}
              display="default"
              onChange={(event, selectedDate) => {
                setStartDate(selectedDate || startDate);
                setShowStartPicker(false);
                setShowEndPicker(false);
              }}
            />
          )}

          {/* 종료일 DatePicker */}
          {!showStartPicker && showEndPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dueDate}
              minimumDate={startDate}
              mode={'date'}
              display="default"
              onChange={(event, selectedDate) => {
                setDueDate(selectedDate || dueDate);
                setShowStartPicker(false);
                setShowEndPicker(false);
              }}
            />
          )}

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
          <View style={[styles.row, { width: '100%', paddingBottom: 20 }]}>
            <View style={styles.hashtagBox}>
              <TextInput
                placeholder={'해시태그를 입력하세요. (최대 5개)'}
                value={hashtag}
                maxLength={14}
                onChangeText={(text) => {
                  setHashtag(text);
                }}
              />
            </View>
            <View style={{ width: '17%' }}>{showAddButton()}</View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#263238',
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 10,
  },
  onoffBox: {
    width: '100%',
    marginBottom: 20,
  },
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
    borderWidth: 2,
    borderColor: getColor('inactiveBorderColor'),
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
  categoryText: {
    flex: 2,
    marginEnd: 20,
  },
  pickerBox: {
    flex: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: getColor('inactiveBorderColor'),
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
    backgroundColor: getColor('defaultColor'),
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

  column: {
    flexDirection: 'column',
    marginBottom: '5%',
  },
  inputBox: {
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: getColor('inactiveBorderColor'),
  },
  tag: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: '3%',
    color: 'black',
  },
  textInputBox: {
    padding: 10,
    borderWidth: 2,
    borderColor: getColor('inactiveBorderColor'),
    borderRadius: 4,
  },
  textarea: {
    height: 150,
    fontSize: 18,
  },
  hashtagBox: {
    width: '80%',
    borderBottomWidth: 2,
    borderColor: getColor('inactiveBorderColor'),
  },
  buttonContainer: {
    flex: 1,
    padding: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: getColor('defaultColor'),
  },
  inactive: {
    backgroundColor: getColor('inactiveColor'),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
