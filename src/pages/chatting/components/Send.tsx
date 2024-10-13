import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
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
      <View className="flex flex-col justify-end w-full mb-3">
        <Text className="bg-primary p-3 rounded-xl text-center ml-auto">
          {content}
        </Text>
        <Text className="text-right">{formatTime(createdAt)}</Text>
      </View>
    );
  }

  return (
    <View className="flex flex-row items-center p-4 pt-2 space-x-3">
      <TextInput
        className="bg-gray-700 flex-1 rounded-3xl text-body-text pl-5"
        placeholder="메시지를 입력하세요."
        placeholderTextColor="#B7B7B7"
        value={inputMessage}
        onChangeText={setInputMessage}
        style={{
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 2,
        }}
      />
      <TouchableOpacity onPress={handleSend}>
        <FeatherIcons name="send" size={30} />
      </TouchableOpacity>
    </View>
  );
};
