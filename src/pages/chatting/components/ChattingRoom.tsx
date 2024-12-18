import {useCreateAnalysis} from '@/api/analysis';
import {useGetRoom} from '@/api/chat';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {ChatMessages} from '@/pages/chatting/components/ChatMessages';
import {Send} from '@/pages/chatting/components/Send';
import {useUserStore} from '@/store/useUserStore';
import {Message} from '@/types/chat';
import {useNavigation} from '@react-navigation/native';
import {Client} from '@stomp/stompjs';
import {useQueryClient} from '@tanstack/react-query';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

interface ChattingRoomProps {
  roomId: number;
}

export const ChattingRoom: React.FC<ChattingRoomProps> = ({roomId}) => {
  const queryClient = useQueryClient();
  const nav = useNavigation();
  const userId = useUserStore(state => state.userInfo?.id);
  const {mutate: createAnalysis} = useCreateAnalysis();

  const [roomData, messages] = useGetRoom(roomId);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const stompClientRef = useRef<Client | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [first, setFirst] = useState<boolean>(true);

  useEffect(() => {
    setChatMessages(sortMessagesByDate(messages));
    scrollViewRef.current?.scrollToEnd({animated: false});
  }, [messages]);

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
    console.log('first', first);
    if (first) {
      scrollViewRef.current?.scrollToEnd({animated: false});
      setFirst(false);
      return;
    }

    scrollToBottom();
  }, [messages]);

  const handleAnalysis = () => {
    if (roomData?.userId) {
      createAnalysis(
        {
          roomId: roomId,
          receiverId: roomData.userId,
          name: roomData.name,
        },
        {
          onSuccess: () => {
            Alert.alert('완료', '분석이 완료되었습니다.');
          },
        },
      );
    }
  };

  // 웹소켓 연결 함수
  const connectWebSocket = () => {
    stompClientRef.current = new Client({
      brokerURL: 'wss://www.mommy-son.kro.kr/ws',
      connectionTimeout: 5000,
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
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
        setChatMessages(prevMessages =>
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
        receiverId: roomData.userId,
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

  const goBack = async () => {
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.CHAT.ALL],
    });
    nav.goBack();
  };

  return (
    <>
      <View className="flex flex-row items-center justify-between bg-secondary p-4">
        <View className="flex flex-row items-center space-x-3">
          <TouchableOpacity onPress={goBack}>
            <AntDesignIcons name="arrowleft" color="white" size={20} />
          </TouchableOpacity>
          <Text className="text-white text-[16px]">{roomData?.name}</Text>
        </View>
        <TouchableOpacity onPress={handleAnalysis}>
          {/* <AntDesignIcons name="linechart" color="white" size={20} /> */}
        </TouchableOpacity>
      </View>
      <ChatMessages
        ref={scrollViewRef}
        messages={chatMessages}
        userId={userId!!}
        onContentSizeChange={scrollToBottom}
      />
      <Send onSend={sendMessage} />
    </>
  );
};
