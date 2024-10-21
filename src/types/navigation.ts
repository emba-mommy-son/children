import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  ChattingList: undefined;
  Chatting: {roomId: number};
};

export type ChattingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Chatting'
>;
