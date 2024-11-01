import { useQuery } from "@realm/react";
import { Location } from "../schemas/LocationSchema";

const useLocation = () => {
  const locations = useQuery(Location);

  const findAll = () => locations.sorted('createdAt', false);
  const findLastCreatedAt = () => {
    const data = locations.sorted('createdAt', true);
    if (data.length === 0) {
      return 0;
    }

    return data[0].createdAt;
  }

  return {
    findAll,
    findLastCreatedAt
  }
}

export default useLocation;