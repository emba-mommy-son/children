import {useEffect, useState} from 'react';
import {useRealm} from '@realm/react';
import {Alert, Button, ScrollView, Text, TextInput, View} from 'react-native';
import Receive from '@pages/chatting/components/Receive';
import Send from '@pages/chatting/components/Send';
import instance from '@api/client';
import useMessage from '@database/query/useMessage';
import useRefineMessage from '@database/query/useRefineMessage';
import useSentiment from '@database/query/useSentiment';
import {Message} from '@database/schemas/MessageSchema';
import {RefineMessage} from '@database/schemas/RefineMessageSchema';
import {Sentiment, SentimentType} from '@database/schemas/SentimentSchema';
import {CustomSafeAreaView} from '@components/common/CustomSafeAreaView';

const TIME_LIMIT: number = 5000;

const Chatting = () => {
  const sender = 'doyoung';
  const [message, setMessage] = useState('');
  const realm = useRealm();
  const messages = useMessage();
  const sentiments = useSentiment();
  const refineMessages = useRefineMessage();

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
      <View className="m-3 flex flex-col h-full">
        <View className="border border-black p-2 rounded-xl mb-2">
          <Text>Sender : {sender}</Text>
        </View>

        <ScrollView className="flex flex-col px-3 my-5">
          {messages
            .findAll('group1', 'user1', 'kakao')
            .map((message, index) => (
              <Receive
                key={index}
                message={message.content}
                bgColor="#F4EAB1"
              />
            ))}
          {refineMessages
            .findAll('group1', 'user1', 'kakao')
            .map((message, index) => (
              <Send
                key={index}
                message={`${message.content}-${message.isAnalyzed}`}
                bgColor="#B1F4D0"
              />
            ))}
        </ScrollView>

        <View className="flex flex-row items-center pt-2 mb-14">
          <TextInput
            className="border border-black p-2 rounded-xl flex-1 mr-2"
            onChangeText={enteredText => setMessage(enteredText)}
            value={message}
          />
          <Button onPress={createMessageDB} title="메시지 보내기" />
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default Chatting;
