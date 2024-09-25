import { useQuery } from "@realm/react";
import { RefineMessage } from "../schemas/RefineMessageSchema";

const useRefineMessage = () => {
  const refindMessages = useQuery(RefineMessage);

  const findAll = (
    group: string,
    sender: string,
    platform: string
  ) => refindMessages
      .filtered(
        'group == $0 && sender == $1 && platform == $2', 
        group,
        sender,
        platform
      )
      .sorted('createdAt', true);

  return {
    findAll,
  }
}

export default useRefineMessage;