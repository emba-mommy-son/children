// 리액트
import {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

// 라이브러리
import {ErrorMessage} from '@hookform/error-message';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';

// 컴포넌트

// 아이콘
import {
  getUserByPhoneNumber,
  useGetUserByPhoneNumber,
} from '@/api/user/useGetUserByPhoneNumber';
import {AddFriendResult} from '@/pages/friend/components/AddFriendResult';
import {UserInfo} from '@/types/user';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

interface AddFriendForm {
  phoneNumber: string;
}

export const AddFriendPage = () => {
  const nav = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const {
    data: friendData,
    isError,
    error,
    isLoading,
  } = useGetUserByPhoneNumber(phoneNumber);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<AddFriendForm>({
    defaultValues: {
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: AddFriendForm) => {
    setPhoneNumber(data.phoneNumber);
  };

  return (
    <SafeAreaView>
      <View className="bg-secondary p-4 flex-row items-center space-x-3">
        <TouchableOpacity onPress={() => nav.goBack()}>
          <AntDesignIcons name="arrowleft" color="white" size={25} />
        </TouchableOpacity>
        <Text className="text-white text-subheading font-semibold mb-1">
          친구 추가
        </Text>
      </View>
      <View>
        <View className="w-full p-5 pb-1 flex flex-row items-center space-x-3">
          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: '전화번호를 입력해주세요.',
              pattern: {
                value: /\d{3}-\d{4}-\d{4}/,
                message: '올바른 전화번호 형식이 아닙니다.',
              },
            }}
            render={({field: {onChange, value}}) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                placeholder="예: 010-1234-5678"
                className="border-b-[1px] border-x-secondary flex-1"
              />
            )}
          />
          <TouchableOpacity
            onPress={handleSubmit(data => onSubmit(data as AddFriendForm))}>
            <AntDesignIcons name="search1" color="black" size={25} />
          </TouchableOpacity>
        </View>
        <ErrorMessage
          errors={errors}
          name="phoneNumber"
          render={({message}) => {
            return <Text className="px-5 text-[#D96363]">{message}</Text>;
          }}
        />
      </View>
      {isLoading && <Text>로딩 중...</Text>}
      {isError && <Text className="px-5 text-[#D96363]">{error.message}</Text>}
      {friendData && (
        <AddFriendResult
          friendData={friendData}
          setFriendData={() => setPhoneNumber('')}
          reset={reset}
        />
      )}
    </SafeAreaView>
  );
};
