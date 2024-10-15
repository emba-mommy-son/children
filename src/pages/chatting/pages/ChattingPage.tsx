import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useState, useRef, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Client} from '@stomp/stompjs';
import {Message} from '@/types/chat';
import {Receive} from '@/pages/chatting/components/Receive';
import {Send} from '@/pages/chatting/components/Send';
import {useGetRoom} from '@/api/chat';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export const ChattingPage: React.FC = () => {
  const nav = useNavigation();
  const [roomQuery, messagesQuery] = useGetRoom(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const stompClientRef = useRef<Client | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const roomId = 1;
  const userId = 2;

  useEffect(() => {
    if (messagesQuery.data) {
      setMessages(sortMessagesByDate(messagesQuery.data));
    }
  }, [messagesQuery.data]);

  const sortMessagesByDate = useCallback((msgs: Message[]) => {
    return [...msgs].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      disconnectWebSocket();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 웹소켓 연결 함수
  const connectWebSocket = () => {
    stompClientRef.current = new Client({
      brokerURL: 'wss://www.mommy-son.kro.kr/ws',
      onConnect: () => {
        console.log('연결성공');
        subscribeToChat();
        enterChatRoom();
      },
    });
    stompClientRef.current.activate();
  };

  // 웹소켓 연결 종료 함수
  const disconnectWebSocket = () => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      console.log('연결종료');
    }
  };

  // 채팅 메시지 구독 함수
  const subscribeToChat = () => {
    if (stompClientRef.current) {
      stompClientRef.current.subscribe(`/sub/chat/${roomId}`, message => {
        const newMessage: Message = JSON.parse(message.body);
        setMessages(prevMessages =>
          sortMessagesByDate([...prevMessages, newMessage]),
        );
        console.log('받은 메시지:', newMessage);
      });
    }
  };

  // 채팅방 입장을 서버에 알리는 함수
  const enterChatRoom = () => {
    if (stompClientRef.current) {
      stompClientRef.current.publish({
        destination: `/pub/chat/enter/${roomId}`,
        body: JSON.stringify({enterUserId: userId}),
      });
    }
  };

  // 채팅을 보내는 함수
  const sendMessage = (message: string) => {
    if (stompClientRef.current && message.trim()) {
      const messageToSend = {
        senderId: userId,
        receiverId: 1,
        message: message.trim(),
      };

      stompClientRef.current.publish({
        destination: `/pub/chat/${roomId}`,
        body: JSON.stringify(messageToSend),
      });
    }
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const goBack = () => {
    nav.goBack();
  };

  if (roomQuery.isLoading || messagesQuery.isLoading) {
    return (
      <SafeAreaView>
        <View className="flex justify-center items-center h-full">
          <Text>로딩 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (roomQuery.isError || messagesQuery.isError) {
    return (
      <SafeAreaView>
        <View className="flex justify-center items-center h-full">
          <Text>데이터를 불러오는 중 오류가 발생했습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const roomData = roomQuery.data;

  return (
    <SafeAreaView>
      <View className="flex flex-col h-full">
        <View className="flex flex-row items-center space-x-3 bg-secondary p-4">
          <TouchableOpacity onPress={goBack}>
            <AntDesignIcons name="arrowleft" color="white" size={25} />
          </TouchableOpacity>
          <Text className="text-white text-subheading mb-1">
            {roomData?.name}
          </Text>
        </View>
        <ScrollView
          ref={scrollViewRef}
          className="flex flex-col my-5 p-4"
          onContentSizeChange={scrollToBottom}>
          {messages.map((message, index) =>
            message.senderId === userId ? (
              <Send
                key={index}
                content={message.content}
                createdAt={message.createdAt}
              />
            ) : (
              <Receive
                key={index}
                content={message.content}
                createdAt={message.createdAt}
              />
            ),
          )}
        </ScrollView>
        <Send onSend={sendMessage} />
      </View>
    </SafeAreaView>
  );
};
