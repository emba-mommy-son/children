import {Fragment} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface BottomNavigationBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const ROUTES = [
  {
    name: '홈',
    hasIcon: true,
    focusIcon: require('../../../assets/icons/home-focus.png'),
    unfocusIcon: require('../../../assets/icons/home-unfocus.png'),
  },
  {
    name: '위치',
    hasIcon: true,
    focusIcon: require('../../../assets/icons/location-focus.png'),
    unfocusIcon: require('../../../assets/icons/location-unfocus.png'),
  },
  {
    name: '채팅',
    hasIcon: false,
    focusIcon: require('../../../assets/icons/chatting-focus.png'),
    unfocusIcon: require('../../../assets/icons/chatting-unfocus.png'),
  },
  {
    name: '친구',
    hasIcon: true,
    focusIcon: require('../../../assets/icons/friends-focus.png'),
    unfocusIcon: require('../../../assets/icons/friends-unfocus.png'),
  },
  {
    name: '건강',
    hasIcon: true,
    focusIcon: require('../../../assets/icons/health-focus.png'),
    unfocusIcon: require('../../../assets/icons/health-unfocus.png'),
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
            {ROUTES[index].hasIcon ? (
              <Fragment>
                <View className="flex justify-center items-center mb-2">
                  <Image
                    className="w-6 h-6"
                    source={ROUTES[index][`${focus}Icon`]}
                  />
                </View>
                <Text style={{color: isFocused ? '#000000' : '#A0A0A0'}}>
                  {ROUTES[index].name}
                </Text>
              </Fragment>
            ) : (
              <View
                className="w-14 h-14 rounded-full flex justify-center items-center relative"
                style={{
                  backgroundColor: isFocused ? '#000000' : '#EEEEEE',
                }}>
                {message > 0 && !isFocused && (
                  <View className="text-xs absolute -top-1 -right-1 bg-red-400 rounded-full w-6 h-6 flex justify-center items-center">
                    <Text className="text-sm text-white font-bold">
                      {message}
                    </Text>
                  </View>
                )}
                <Image
                  className="w-6 h-6"
                  source={ROUTES[index][`${focus}Icon`]}
                />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigationBar;
