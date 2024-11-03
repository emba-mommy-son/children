import {Boundary} from '@/database/schemas/BoundarySchema';
import {useQuery} from '@realm/react';

const useBoundary = () => {
  const boundary = useQuery(Boundary);

  const findAll = () => boundary.sorted('createdAt', false);

  return {findAll};
};

export default useBoundary;
