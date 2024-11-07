import {LocationModal} from '@/pages/location/components/LocationModal';
import {useLocationStore} from '@/store/useLocationStore';
import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export const LocationPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const location = useLocationStore(state => state.location);

  const handleOpen = () => {
    setModalOpen(true);
  };
  return (
    <View className="flex-1 relative">
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.latitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          className="flex-1 w-full h-full"
          showsUserLocation={true}
          showsMyLocationButton={true}
        />
      )}
      <Pressable
        onPress={handleOpen}
        className="absolute bottom-4 w-full items-center">
        <Text className="text-base font-bold text-white bg-primary px-7 py-2 rounded-3xl z-50">
          상세 위치 보기
        </Text>
      </Pressable>
      {modalOpen && location && (
        <LocationModal
          latitude={location.latitude}
          longitude={location.latitude}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </View>
  );
};
