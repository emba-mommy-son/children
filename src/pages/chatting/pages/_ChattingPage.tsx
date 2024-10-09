import instance from '@api/client';
import Friend from '@assets/icons/friend/friendImage.png';
import {CustomSafeAreaView} from '@components/common/CustomSafeAreaView';
import useMessage from '@database/query/useMessage';
import useRefineMessage from '@database/query/useRefineMessage';
import useSentiment from '@database/query/useSentiment';
import {Message} from '@database/schemas/MessageSchema';
import {RefineMessage} from '@database/schemas/RefineMessageSchema';
import {Sentiment, SentimentType} from '@database/schemas/SentimentSchema';
import Receive from '@pages/chatting/components/Receive';
import Send from '@pages/chatting/components/Send';
import {useNavigation} from '@react-navigation/native';
import {useRealm} from '@realm/react';
import {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, Text, TextInput, View} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FeatherIcons from 'react-native-vector-icons/Feather';

const TIME_LIMIT: number = 5000;

export const ChattingPage = () => {
  const sender = 'doyoung';
  const [message, setMessage] = useState('');
  const realm = useRealm();
  const messages = useMessage();
  const sentiments = useSentiment();
  const refineMessages = useRefineMessage();
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  };

  useEffect(() => {
    async function test() {
      const {data} = await instance.get<{
        sentiment: SentimentType;
        translated: string;
        score: {
          positive: number;
          negative: number;
          neutral: number;
          mixed: number;
        };
      }>('/api/v1/comprehend/analyze', {
        params: {
          text: '테스트 메시지',
        },
      });

      console.log('456');
      return data;
    }

    test().then(data => console.log(data));
  });

  useEffect(() => {
    realm.objects<Sentiment>('Sentiment').addListener((collection, changes) => {
      changes.insertions.forEach(async index => {
        const sentiment = collection[index];

        if (sentiment.sentiment !== SentimentType.NEGATIVE) return;

        console.log(sentiment.translated);

        const response = await instance.post<{
          input: string;
          output: string;
        }>('/api/v1/bedrock/generate', {
          text: `
            아이 이름: 민준수
            보낸 사람: 이인준
            닥친 상황: 학교폭력
            대화 내용: ${sentiment.translated}
            감정 분석: 슬픔, 부정 (40%)
          `,
        });

        console.log(response);

        // realm.write(() => {
        //   realm.create('GenerateMessage', GenerateMessage.create({
        //     input,
        //     output,
        //   }))
        // })
      });
    });
  });

  useEffect(() => {
    // realm.write(() => {
    //   realm.deleteAll();
    // })
    // return;
    realm
      .objects<RefineMessage>('RefineMessage')
      .addListener((collection, changes) => {
        changes.insertions.forEach(async index => {
          const save = collection[index];
          const {data} = await instance.get<{
            sentiment: SentimentType;
            translated: string;
            score: {
              positive: number;
              negative: number;
              neutral: number;
              mixed: number;
            };
          }>('/api/v1/comprehend/analyze', {
            params: {
              text: save.content,
            },
          });

          realm.write(() => {
            realm.create(
              'Sentiment',
              Sentiment.create({
                original: save.content,
                translated: data.translated,
                sentiment: data.sentiment,
                positiveScore: data.score.positive,
                negativeScore: data.score.negative,
                neutralScore: data.score.neutral,
                mixedScore: data.score.mixed,
              }),
            );

            save.isAnalyzed = true;
          });
        });
      });
  }, []);

  const createMessageDB = () => {
    // 메시지가 비어있지 않을 때
    if (!message) {
      Alert.alert('메시지를 입력해주세요.');
      return;
    }

    const now = new Date();

    const newMessage = Message.create({
      platform: 'kakao',
      sender: 'user1',
      group: 'group1',
      content: message,
      createdAt: now,
    });

    // group, sender, platform이 같은 메시지 중 가장 최근 메시지를 가져옴
    const recentMessage = messages.findAll(
      newMessage.group,
      newMessage.sender,
      newMessage.platform,
    );

    if (recentMessage.length === 0) {
      realm.write(() => {
        realm.create('Message', newMessage);
      });

      setMessage('');
      return;
    }

    const prevTime = recentMessage[0].createdAt.getTime();
    const currentTime = now.getTime();

    // TIME_LIMIT 이상의 시간이 지났을 때 RefineMessage 생성
    if (currentTime - prevTime > TIME_LIMIT) {
      const recentRefineMessages = refineMessages.findAll(
        newMessage.group,
        newMessage.sender,
        newMessage.platform,
      );

      // 만약, 지금까지 저장한 RefineMessage가 없을 때
      if (recentRefineMessages.length === 0) {
        const recentMessages = [...recentMessage].reverse();
        const refineMessage = RefineMessage.create({
          platform: newMessage.platform,
          sender: newMessage.sender,
          group: newMessage.group,
          content: recentMessages.map(message => message.content).join(' '),
          createdAt: now,
        });

        realm.write(() => {
          realm.create('RefineMessage', refineMessage);
        });

        setMessage('');
        return;
      }

      const prevRefineTime = recentRefineMessages[0].createdAt;
      const previousMessages = messages
        .findPrevious(
          newMessage.group,
          newMessage.sender,
          newMessage.platform,
          prevRefineTime,
          now,
        )
        .map(message => message.content)
        .join(' ');

      if (previousMessages) {
        const refineMessage = RefineMessage.create({
          platform: newMessage.platform,
          sender: newMessage.sender,
          group: newMessage.group,
          content: previousMessages,
          createdAt: now,
        });

        realm.write(() => {
          realm.create('RefineMessage', refineMessage);
        });
      }
    }

    realm.write(() => {
      realm.create('Message', newMessage);
    });

    setMessage('');
  };

  return (
    <CustomSafeAreaView>
      <View className="flex flex-col h-full p-4">
        <View className="flex flex-row items-center space-x-3">
          <AntDesignIcons
            name="arrowleft"
            color="#000000"
            size={30}
            onPress={goBack}
          />
          <Image source={Friend} className="w-12 h-12" />
          <Text className="text-black text-subheading">김도영</Text>
        </View>

        <ScrollView className="flex flex-col px-3 my-5">
          // !FIXME : 사용자에 따라 send, receive 구분
          {messages
            .findAll('group1', 'user1', 'kakao')
            .map((message, index) => (
              <Receive key={index} message={message.content} />
            ))}
          {refineMessages
            .findAll('group1', 'user1', 'kakao')
            .map((message, index) => (
              <Send
                key={index}
                message={`${message.content}-${message.isAnalyzed}`}
              />
            ))}
        </ScrollView>

        <View className="flex flex-row items-center pt-2 space-x-3">
          <TextInput
            className="bg-gray-700 px-4 flex-1 rounded-3xl text-body-text"
            onChangeText={enteredText => setMessage(enteredText)}
            value={message}
            placeholder="메시지를 입력하세요."
            placeholderTextColor="#B7B7B7"
            style={{
              shadowColor: 'black', // 그림자 색상
              shadowOffset: {width: 0, height: 1}, // 그림자 크기 (x, y)
              shadowOpacity: 0.25, // 그림자 불투명도
              shadowRadius: 3.84, // 그림자 흐림 정도
              elevation: 2, // Android에서의 그림자 효과
            }}
          />
          <FeatherIcons name="send" size={30} onPress={createMessageDB} />
        </View>
      </View>
    </CustomSafeAreaView>
  );
};
