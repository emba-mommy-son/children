import {useQuery} from '@realm/react';
import {GenerateMessage} from '../schemas/GenerateMessageSchema';

export const useGenerateMessage = () => {
  const generateMessages = useQuery(GenerateMessage);

  const findAll = () => generateMessages.sorted('createdAt', true);

  return {
    findAll,
  };
};
