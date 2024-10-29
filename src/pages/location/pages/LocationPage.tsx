import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export const LocationPage = () => {
  return (
    <>
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1, width: '100%', height: '100%'}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onMapReady={() => console.log('Map is ready')} // 맵 로딩 확인
          onRegionChange={region => console.log('Region:', region)} // 지역 변경 확인
        />
      </View>
    </>
  );
};
