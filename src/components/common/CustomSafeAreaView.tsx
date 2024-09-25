import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface CustomSafeAreaViewProps {
  children: React.ReactNode;
  className?: string;
}

const CustomSafeAreaView = ({children, className}: CustomSafeAreaViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={className}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      {children}
    </View>
  );
};

export default CustomSafeAreaView;
