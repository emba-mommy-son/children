import {
  useDeleteAttendance,
  useGetAttendance,
  usePostAttendance,
} from '@/api/attendance';
import {useEffect} from 'react';
useDeleteAttendance;

interface AttendanceModalProps {
  attendanceOpen: boolean;
  setAttendanceOpen: (value: boolean) => void;
}

export const AttendanceModal = ({
  setAttendanceOpen,
}: AttendanceModalProps) => {
  const {data: attendanceData, isLoading, isError} = useGetAttendance();
  const {mutate: postAttendance} = usePostAttendance();

  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (attendanceData === undefined) return;

    console.log(attendanceData, todayDate);

    if (attendanceData.includes(todayDate)) {
      console.log('출석 완료');
      return;
    }

    postAttendance(null);
    setAttendanceOpen(true);
  }, [attendanceData]);

  const handleModalClose = () => {
    setAttendanceOpen(false);
  };

  return (
    // <Modal
    //   animationType="none"
    //   visible={attendanceOpen}
    //   transparent={true}
    //   onRequestClose={handleModalClose}>
    //   <Pressable
    //     className="flex-1 bg-black/50 justify-center items-center"
    //     onPress={handleModalClose}>
    //     <View
    //       className="bg-primary rounded-xl p-10"
    //       onStartShouldSetResponder={() => true}>
    //       <Text className="text-white">출석 완료!</Text>
    //     </View>
    //   </Pressable>
    // </Modal>
    null
  );
};
