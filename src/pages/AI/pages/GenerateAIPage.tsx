// import {CustomSafeAreaView} from '@/components/common/CustomSafeAreaView';
// import {useGenerateMessage} from '@/database/query/useGenerateMessage';
// import {GenerateMessage} from '@/database/schemas/GenerateMessageSchema';
// import {Receive} from '@/pages/chatting/components/Receive';
// import {useState} from 'react';
// import {ScrollView, TextInput, View} from 'react-native';
// import FeatherIcons from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// export const GenerateAIPage = () => {
//   const [message, setMessage] = useState('');
//   const messages = useGenerateMessage();

//   return (
//     <CustomSafeAreaView>
//       <View className="mx-5 h-full">
//         <View className="w-full h-16 flex justify-center items-center">
//           <MaterialCommunityIcons
//             name="robot-outline"
//             size={24}
//             color="#000000"
//           />
//         </View>

//         <ScrollView className="px-3 my-5">
//           {messages.findAll().map((message: GenerateMessage, index: number) => (
//             <Receive key={index} message={message.output} />
//           ))}
//         </ScrollView>

//         <View className="flex flex-row items-center pt-2 fixed bottom-3">
//           <View className="flex-1 relative">
//             <TextInput
//               className="bg-gray-200 px-4 py-2 rounded-3xl w-full"
//               onChangeText={enteredText => setMessage(enteredText)}
//               value={message}
//               placeholder="메시지를 입력하세요."
//               placeholderTextColor="#B7B7B7"
//               style={{
//                 fontSize: 14,
//                 shadowColor: 'black', // 그림자 색상
//                 shadowOffset: {width: 0, height: 1}, // 그림자 크기 (x, y)
//                 shadowOpacity: 0.25, // 그림자 불투명도
//                 shadowRadius: 3.84, // 그림자 흐림 정도
//                 elevation: 4, // Android에서의 그림자 효과
//               }}
//             />
//             {message && (
//               <FeatherIcons
//                 name="send"
//                 size={24}
//                 color="#000000"
//                 style={{
//                   position: 'absolute',
//                   right: 20, // right 값 조정
//                   top: '50%',
//                   transform: [{translateY: -12}], // 중앙 정렬
//                 }}
//               />
//             )}
//           </View>
//         </View>
//       </View>
//     </CustomSafeAreaView>
//   );
// };
