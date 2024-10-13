import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useGetRoom} from '@api/chat/useGetRoom';
import {Client} from '@stomp/stompjs';
import {Receive} from '@pages/chatting/components/Receive';
import {Send} from '@pages/chatting/components/Send';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

interface Message {
  senderId: number;
  content: string;
  createdAt: string;
}

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
      setMessages(messagesQuery.data);
    }
  }, [messagesQuery.data]);

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
    // stomp 클라이언트 인스턴스 생성
    stompClientRef.current = new Client({
      brokerURL: 'wss://www.mommy-son.kro.kr/ws',

      // 연결에 성공하면 실행
      onConnect: () => {
        console.log('연결성공');
        // 채팅 메시지 구독
        subscribeToChat();
        // 채팅방 입장 메시지 보냄
        enterChatRoom();
      },
    });
    // 웹소켓 연결 활성화
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
      // 특정 채팅방의 메시지를 구독 지금은 1로 박았는데 수정해야됨
      stompClientRef.current.subscribe(`/sub/chat/${roomId}`, message => {
        // 수신한 메시지를 파싱하고
        const newMessage: Message = JSON.parse(message.body);
        // 메시지에 추가
        setMessages(prevMessages => [...prevMessages, newMessage]);
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
            <AntDesignIcons name="arrowleft" color="white" size={30} />
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
