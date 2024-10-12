import { useQuery } from "@realm/react";
import { Message } from "../schemas/MessageSchema";

export const useMessage = () => {
  const messages = useQuery(Message);

  const findAll = (
    group: string,
    sender: string,
    platform: string
  ) => messages
      .filtered(
        'group == $0 && sender == $1 && platform == $2', 
        group,
        sender,
        platform
      )
      .sorted('createdAt', true)

  const findPrevious = (
    group: string,
    sender: string,
    platform: string,
    startDate: Date,
    endDate: Date
  ) => messages
      .filtered(
        'group == $0 && sender == $1 && platform == $2 && createdAt > $3 && createdAt < $4',
        group,
        sender,
        platform,
        startDate,
        endDate
      )
      .sorted('createdAt', false);
  
  return {
    findAll,
    findPrevious
  }
};