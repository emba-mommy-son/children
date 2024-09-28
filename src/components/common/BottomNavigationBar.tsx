import {Fragment} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/Ionicons';

interface BottomNavigationBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const ROUTES = [
  {
    name: '홈',
    hasIcon: true,
    focusIcon: 'home',
    unfocusIcon: 'home-outline',
  },
  {
    name: '친구',
    hasIcon: true,
    focusIcon: 'person',
    unfocusIcon: 'person-outline',
  },
  {
    name: '채팅',
    hasIcon: false,
    focusIcon: 'chatbubble-ellipses',
    unfocusIcon: 'chatbubble-ellipses-outline',
  },
  {
    name: '수면',
    hasIcon: true,
    focusIcon: 'moon',
    unfocusIcon: 'moon-outline',
  },
  {
    name: '위치',
    hasIcon: true,
    focusIcon: 'location',
    unfocusIcon: 'location-outline',
  },
];

const BottomNavigationBar = (props: BottomNavigationBarProps) => {
  const insets = useSafeAreaInsets();
  const message = 1;

  return (
    <View className="flex flex-row w-full py-3 items-center px-1">
      {props.state.routes.map((route: any, index: number) => {
        const {options} = props.descriptors[route.key];

        const isFocused = props.state.index === index;
        const focus = isFocused ? 'focus' : 'unfocus';

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            className="flex-1 items-center mb-1"
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            style={{flex: 1}}
            onPress={onPress}>
            {
              <Fragment>
                <View className="flex justify-center items-center mb-2">
                  <Icons
                    name={ROUTES[index][`${focus}Icon`]}
                    size={25}
                    color={isFocused ? '#000000' : '#8C8C8C'}
                  />
                </View>
                <Text style={{color: isFocused ? '#000000' : '#8C8C8C'}}>
                  {ROUTES[index].name}
                </Text>
              </Fragment>
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigationBar;
