import {useQuery} from '@realm/react';
import {Location} from '../schemas/LocationSchema';

const useLocation = () => {
  const locations = useQuery(Location);

  const findAll = () => locations.sorted('createdAt', false);

  const findLastCreatedAt = () => {
    const data = locations.sorted('createdAt', true);
    if (data.length === 0) {
      return 0;
    }

    return data[0].createdAt;
  };

  const findLastLocation = () => {
    const data = locations.sorted('createdAt', true);
    if (data.length === 0) {
      return null;
    }

    return {latitude: data[0].latitude, longitude: data[0].longitude};
  };

  return {
    findAll,
    findLastCreatedAt,
    findLastLocation,
  };
};

export default useLocation;
