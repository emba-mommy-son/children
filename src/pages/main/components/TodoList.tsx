import {useDeleteAttendance} from '@/api/attendance';
import {Button, View} from 'react-native';

export const TodoList = () => {
  const {mutate: deleteAttendance} = useDeleteAttendance();

  const handleDeleteAttendance = () => {
    console.log('delete click');
    // !FIXME : null 하면 안될거 같은데
    deleteAttendance(null);
  };
  return (
    <View className="w-full h-12 bg-navy flex items-center justify-center">
      <Button
        title="delete attendance"
        onPress={handleDeleteAttendance}></Button>
    </View>
  );
};
