import {DateHeader} from '@/pages/chatting/components/DateHeader';
import {Receive} from '@/pages/chatting/components/Receive';
import {Send} from '@/pages/chatting/components/Send';
import {Message} from '@/types/chat';
import {forwardRef} from 'react';
import {ScrollView} from 'react-native';

interface ChatMessagesProps {
  messages: Message[];
  userId: number;
  onContentSizeChange?: () => void;
}

export const ChatMessages = forwardRef<ScrollView, ChatMessagesProps>(
  // ScrollView의 ref변경을 부모로 전달해야해서 forwardRef사용
  // 즉 새 메시지가 오면 자동으로 스크롤 아래로 이동하게 하기 위해서
  ({messages, userId, onContentSizeChange}, ref) => {
    const renderMessages = () => {
      let currentDate = '';

      return messages.map((message, index) => {
        const messageDate = new Date(message.createdAt).toDateString();
        let dateHeader = null;

        if (messageDate !== currentDate) {
          currentDate = messageDate;
          dateHeader = (
            <DateHeader key={`date-${messageDate}`} date={message.createdAt} />
          );
        }
        // 내 아이디면 Send로 상대 메시지면 Receive로
        const messageComponent =
          message.userId === userId ? (
            <Send
              key={`message-${index}`}
              content={message.content}
              createdAt={message.createdAt}
            />
          ) : (
            <Receive
              key={`message-${index}`}
              content={message.content}
              createdAt={message.createdAt}
            />
          );
        // 날짜가 바뀌는 시점이면 [날짜헤더, 메시지] 배열 반환
        // 아니면 메시지만 반환
        return dateHeader ? [dateHeader, messageComponent] : messageComponent;
      });
    };

    return (
      <ScrollView
        ref={ref}
        className="flex flex-col mt-2 mb-5 p-4 pt-0"
        onContentSizeChange={onContentSizeChange}>
        {renderMessages()}
      </ScrollView>
    );
  },
);
