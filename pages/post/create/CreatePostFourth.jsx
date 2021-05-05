import React, { useCallback, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { HeaderBack } from '../../../components/header';
import { HashtagButton, FullButton } from '../../../components/button';

import { postPosts } from '../../../config/api/PostAPI';

import { ProgressBar, Colors } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function CreatePostFourth({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [hashtagList, setHashtagList] = useState([]);
  const [hashtag, setHashtag] = useState('');

  let onAndOff = route.params.onAndOff;
  let category = route.params.category;
  let personnel = route.params.personnel;
  let location = route.params.location;
  let startDate = route.params.startDate;
  let dueDate = route.params.dueDate;
  let position = route.params.position;
  let language = route.params.language;

  const upload = async () => {
    await postPosts(
      navigation,
      onAndOff,
      category,
      personnel,
      location,
      startDate,
      dueDate,
      position,
      language,
      title,
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
    if (intro == '' || hashtagList.length == 0) {
      return <FullButton title={'게시하기'} empty={true} />;
    } else {
      return (
        <FullButton
          title={'게시하기'}
          empty={false}
          doFunction={() => upload()}
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
      <HeaderBack
        navigation={navigation}
        title={'자신을 마음껏 표현해보세요 :)'}
      />
      {/* 진행도 현황 */}
      <ProgressBar
        progress={1}
        color={Colors.grey900}
        backgroundColor={Colors.grey50}
      />
      <KeyboardAwareScrollView style={styles.content}>
        <Text style={styles.serviceComment}>
          소개글과 설명,{'\n'}해시태그를 입력해주세요.
        </Text>

        {/* 소개글 */}
        <View
          style={{
            width: '100%',
            paddingVertical: '2%',
            borderBottomWidth: 1,
            borderColor: 'black',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              paddingVertical: '3%',
              fontWeight: 'bold',
            }}
          >
            소개글
          </Text>
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
        <View style={{ width: '100%', paddingBottom: 20 }}>
          <Text
            style={{
              color: '#263238',
              fontSize: 18,
              fontWeight: 'bold',
              marginVertical: 10,
            }}
          >
            설명
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
      </KeyboardAwareScrollView>
      {showSubmitButton()}
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
  textarea: {
    height: 80,
    width: '90%',
    fontSize: 15,
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
  serviceComment: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: '5%',
    color: 'black',
  },
});
