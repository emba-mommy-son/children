import {
  useDeleteAttendance,
  useGetAttendance,
  usePostAttendance,
} from '@/api/attendance';
import {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
useDeleteAttendance;

export const Attendance = () => {
  const {data: attendanceData, isLoading, isError} = useGetAttendance();
  const {mutate: postAttendance} = usePostAttendance();
  const {mutate: deleteAttendance} = useDeleteAttendance();

  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (attendanceData === undefined) return;

    console.log(attendanceData, todayDate);

    if (attendanceData.includes(todayDate)) {
      console.log('출석 완료');
      return;
    }

    // !FIXME : null 하면 안될거 같은데
    postAttendance(null);
  }, [attendanceData]);

  const handleDeleteAttendance = () => {
    console.log('delete click');
    // !FIXME : null 하면 안될거 같은데
    deleteAttendance(null);
  };

  return (
    <View className="w-full bg-navy flex items-center justify-center">
      <Text className="text-white">Attendance</Text>
      <Button
        title="delete attendance"
        onPress={handleDeleteAttendance}></Button>
    </View>
  );
};
