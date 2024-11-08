import {useGeoLocation} from '@/hooks/useGeoLocation';
import {LocationModal} from '@/pages/location/components/LocationModal';
import {mapKey} from '@/secret/mapKey';
import {useLocationStore} from '@/store/useLocationStore';
import {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const GOOGLE_MAPS_API_KEY = mapKey;

export const LocationPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const location = useLocationStore(state => state.location);
  const {checkPermission} = useGeoLocation();
  const [nowPosition, setNowPosition] = useState<{
    latitude: number;
    longitude: number;
    name: string;
  }>({
    latitude: location?.latitude || 0,
    longitude: location?.longitude || 0,
    name: location?.name || '',
  });

  console.log('location 페이지', location);

  const handleOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    setInterval(() => {
      checkPermission().then(result => {
        if (result === 'granted') {
          GeoLocation.getCurrentPosition(async position => {
            if (
              position.coords.latitude === 0 &&
              position.coords.longitude === 0
            ) {
              return;
            }``

            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}&language=ko`,
            );
            const data = await response.json();

            setNowPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              name: data.results[0].formatted_address,
            });
          });
        }
      });
    }, 2 * 60 * 1000);
  }, []);

  return (
    <View className="flex-1 relative">
      {nowPosition && (
        <MapView
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: nowPosition.latitude,
            longitude: nowPosition.longitude,
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
      {modalOpen && nowPosition && (
        <LocationModal
          modalOpen={modalOpen}
          name={nowPosition.name}
          setModalOpen={setModalOpen}
        />
      )}
    </View>
  );
};
