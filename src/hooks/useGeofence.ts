import useBoundary from '@/database/query/useBoundary';

interface LocationData {
  latitude: number;
  longitude: number;
}

export const useGeofence = () => {
  const {findAll} = useBoundary();

  const toRad = (value: number) => {
    return (value * Math.PI) / 180;
  };

  const calculateDistance = ({
    lat1,
    lon1,
    lat2,
    lon2,
  }: {
    lat1: number;
    lon1: number;
    lat2: number;
    lon2: number;
  }) => {
    const R = 6371; // km 단위
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const checkBoundary = async ({latitude, longitude}: LocationData) => {
    const boundaries = await findAll();

    const newBoundaries = boundaries.filter(boundary => {
      const distance = calculateDistance({
        lat1: latitude,
        lon1: longitude,
        lat2: boundary.latitude,
        lon2: boundary.longitude,
      });
      return boundary.danger
        ? distance < boundary.radius / 1000
        : distance > boundary.radius / 1000;
    });

    return newBoundaries;
  };

  return {checkBoundary};
};
