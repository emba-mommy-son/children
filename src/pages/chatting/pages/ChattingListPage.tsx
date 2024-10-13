import React, {useEffect, useState, useCallback, useRef} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {Client} from '@stomp/stompjs';
import {useGetRooms} from '@api/chat/useGetRooms';
import {Room} from 'types/chat';
import {ChattingItem} from '@pages/chatting/components/ChattingItem';

interface Message {
  senderId: number;
  content: string;
  createdAt: string;
}

export const ChattingListPage: React.FC = () => {
  const {data: rooms, isLoading, isError} = useGetRooms();
  const stompClientRef = useRef<Client | null>(null);

  // 마운트될때 소켓연결 시도, 언마운트될때 소켓 끊기
  useEffect(() => {
    console.log('소켓 연결 시도');
    connect();
    return () => {
      console.log('소켓종료');
      disconnect();
    };
  }, []);
  // 연결 설정, stomp클라이언트 활성화
  const connect = () => {
    stompClientRef.current = new Client({
      brokerURL: 'wss://www.mommy-son.kro.kr/ws',

      // 디버그 메시지 출력
      debug: str => {
        console.log('STOMP Debug:', str);
      },
      // 연결 성공했을때 콘솔에 찍히게
      onConnect: frame => {
        console.log('Connected: ' + frame);
        subscribeToChat();
      },
      // stomp 프로토콜 레벨에서 에러 발생했을때 찍히는거
      onStompError: frame => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      // 소켓 연결에서 에러발생하면 실행되는 콜백
      onWebSocketError: event => {
        console.error('WebSocket error', event);
      },
      // 소컷 연결이 닫혔을때 실행되는 콜백
      onWebSocketClose: event => {
        console.log('WebSocket closed', event);
      },
    });
    // stomp 클라이언트 활성화
    stompClientRef.current.activate();
  };
  // 웹소켓 연결 종료 함수
  const disconnect = () => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      console.log('Disconnected');
    }
  };
  // 채팅 메시지 구독 일단 1번만 구독
  const subscribeToChat = () => {
    if (stompClientRef.current) {
      stompClientRef.current.subscribe('/sub/chat/user/1', message => {
        console.log('Received message:', message);
        showMessage(message.body);
      });
    }
  };
  // 메시지 수신 일단 콘솔에만
  const showMessage = (message: string) => {
    console.log('메시지', new Date() + '  -  ' + message);
  };

  const renderItem = ({item}: {item: Room}) => <ChattingItem item={item} />;
  if (isLoading) return <Text>로딩중</Text>;
  if (isError) return <Text>에러</Text>;
  if (!rooms) return null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4">
        <Text className="text-white text-subheading font-semibold">채팅</Text>
      </View>
      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={item => item.roomId.toString()}
        className="flex-1 px-8 pb-4"
      />
    </SafeAreaView>
  );
};
