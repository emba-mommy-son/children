import {useGeocoding} from '@/hooks/useGeoCoding';
import {useLocationStore} from '@/store/useLocationStore';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FontAwesome6Icons from 'react-native-vector-icons/FontAwesome6';

export const WarningLocationPage = () => {
  const location = useLocationStore(state => state.location);
  const {address, reverseGeocode} = useGeocoding();
  const nav = useNavigation();

  const handleBackPress = () => {
    nav.goBack();
  };

  useEffect(() => {
    if (location) {
      reverseGeocode(location.latitude, location.longitude);
    }
  }, []);

  return (
    <View>
      <View className="flex flex-row items-center space-x-3 bg-lightpurple p-4">
        <AntDesignIcons
          name="arrowleft"
          color="black"
          size={20}
          onPress={handleBackPress}
        />
      </View>
      <View className="flex justify-center items-center my-20 space-y-4">
        <View className="flex flex-row">
          <Text className="text-pink text-xl font-bold">긴급알람</Text>
          <Text className="text-black text-xl font-bold">
            이 전송되었습니다.
          </Text>
        </View>
        <Text className="text-gray-900 text-lg mb-5">
          부모님은 긴급알람 메시지를 받게 됩니다.
        </Text>
        <View className="flex justify-center items-center rounded-full overflow-hidden mb-5">
          {location && (
            <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              className="w-60 h-44"
              showsUserLocation={true}
            />
          )}
        </View>
        <View className="flex flex-row justify-center items-center mt-4 space-x-3">
          <FontAwesome6Icons name="location-dot" color="#E86256" size={25} />
          <Text className="text-black font-bold text-xl">
            {address?.split(' ').slice(2).join(' ')}
          </Text>
        </View>
      </View>
    </View>
  );
};
