import {LocationModal} from '@/pages/location/components/LocationModal';
import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export const LocationPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setModalOpen(true);
  };
  return (
    <View className="flex-1 relative">
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
        // onMapReady={() => console.log('Map is ready')} // 맵 로딩 확인
        // onRegionChange={region => console.log('Region:', region)} // 지역 변경 확인
      />
      <Pressable
        onPress={handleOpen}
        className="absolute bottom-4 w-full items-center">
        <Text className="text-base font-bold text-white bg-primary px-7 py-2 rounded-3xl z-50">
          상세 위치 보기
        </Text>
      </Pressable>
      {modalOpen && (
        <LocationModal
          latitude={35.1900745}
          longitude={126.8241512}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </View>
  );
};
