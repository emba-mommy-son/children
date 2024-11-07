import {Boundary} from '@/database/schemas/BoundarySchema';
import {useQuery} from '@realm/react';
import {useRef, useState} from 'react';

const useBoundary = () => {
  const boundary = useQuery(Boundary);
  const [a, setA] = useState();
  const ref = useRef();

  const findAll = () => boundary.sorted('id', false);

  return {findAll};
};

export default useBoundary;
