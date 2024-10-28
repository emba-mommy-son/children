import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';

interface SendProps {
  content?: string;
  createdAt?: string;
  onSend?: (message: string) => void;
}

export const Send: React.FC<SendProps> = ({content, createdAt, onSend}) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (onSend && inputMessage.trim()) {
      onSend(inputMessage);
      setInputMessage('');
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  if (content && createdAt) {
    return (
      <View className="flex flex-row justify-end items-end w-full mb-3 ml-auto space-x-2">
        <Text className="text-[10px] mb-1">{formatTime(createdAt)}</Text>
        <Text className="bg-primary p-3 rounded-xl rounded-br-none text-center text-white">
          {content}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex flex-row items-center p-4 pt-2 space-x-3">
      <TextInput
        className="bg-gray-700 flex-1 rounded-3xl text-[14px] pl-5 placeholder:text-[14px]"
        placeholder="메시지를 입력하세요."
        placeholderTextColor="#B7B7B7"
        value={inputMessage}
        onChangeText={setInputMessage}
        onSubmitEditing={handleSend}
        returnKeyType="send"
        style={{
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 2,
        }}
      />
      <TouchableOpacity onPress={handleSend}>
        <FeatherIcons name="send" size={25} />
      </TouchableOpacity>
    </View>
  );
};
