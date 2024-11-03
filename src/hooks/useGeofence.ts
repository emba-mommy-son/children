import useBoundary from '@/database/query/useBoundary';
import useLocation from '@/database/query/useLocation';
import {useEffect, useState} from 'react';

interface GeofenceData {
  id: number;
  latitude: number;
  longitude: number;
  radius: number;
  danger: boolean;
  createdAt: Date;
}

export const useGeofence = () => {
  const [init, setInit] = useState(true);
  const [boundaries, setBoundaries] = useState<GeofenceData[]>([]);
  const {findLastLocation} = useLocation();
  const {findAll} = useBoundary();

  const [isOutOfBounds, setIsOutOfBounds] = useState<number[]>([]);

  const initialze = () => {
    setInit(true);
  };

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

  const checkBoundary = () => {
    const currentLocation = findLastLocation();
    if (currentLocation === null) {
      return;
    }

    const newBoundaries = boundaries
      .filter(boundary => {
        const distance = calculateDistance({
          lat1: currentLocation.latitude,
          lon1: currentLocation.longitude,
          lat2: boundary.latitude,
          lon2: boundary.longitude,
        });
        return boundary.danger
          ? distance < boundary.radius / 1000
          : distance > boundary.radius / 1000;
      })
      .map(boundary => {
        return boundary.id;
      });

    setIsOutOfBounds(newBoundaries);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const storedBoundaries = findAll();
      // console.log('storedBoundaries', storedBoundaries);

      if (storedBoundaries) {
        setBoundaries(
          storedBoundaries.map(boundary => boundary as GeofenceData),
        );
      }

      if (init) {
        checkBoundary();
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    isOutOfBounds,
    initialze,
  };
};
