import {View, SectionList, Text} from 'react-native';
import {Reward} from '@/types/reward';
import {useGetRewards} from '@/api/reward';
import {RewardItem} from '@/pages/reward/components/RewardItem';

interface RewardListProps {
  year: number;
  month: number;
}

interface Section {
  date: string;
  data: Reward[];
}

const EmptyReward = () => (
  <View className="flex-1 justify-center items-center py-20 gap-1">
    <Text>활동 내역이 없습니다</Text>
    <Text>다양한 활동을 통해 리워드를 획득해보세요</Text>
  </View>
);

const formatDate = (date: Date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getDate()}일 ${days[date.getDay()]}요일`;
};

export const RewardList = ({year, month}: RewardListProps) => {
  const {data} = useGetRewards({year, month});

  // 날짜별로 데이터 그룹화
  const groupedData = data?.reduce<Section[]>((acc, item) => {
    const date = new Date(item.createdAt);
    const dateString = formatDate(date);

    const existingSection = acc.find(section => section.date === dateString);
    if (existingSection) {
      existingSection.data.push(item);
    } else {
      acc.push({
        date: dateString,
        data: [item],
      });
    }

    return acc;
  }, []);

  return (
    <SectionList
      sections={groupedData || []}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <RewardItem item={item} />}
      renderSectionHeader={({section: {date}}) => (
        <Text className="pt-4 pb-2 border-b border-gray-700">{date}</Text>
      )}
      ListEmptyComponent={EmptyReward}
      stickySectionHeadersEnabled={false}
    />
  );
};
