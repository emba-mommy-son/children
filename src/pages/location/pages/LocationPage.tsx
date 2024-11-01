import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export const LocationPage = () => {
  // TODO: 위치 정보는 1분에 1번씩 realm에서 가져오면 되지 않나?
  return (
    <View className="flex-1">
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 35.1900745,
          longitude: 126.8241512,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        className="flex-1 w-full h-full"
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => console.log('Map is ready')} // 맵 로딩 확인
        onRegionChange={region => console.log('Region:', region)} // 지역 변경 확인
      />
    </View>
  );
};
