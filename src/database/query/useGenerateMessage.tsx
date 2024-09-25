import { useQuery } from "@realm/react"
import { GenerateMessage } from "../schemas/GenerateMessageSchema";

const useGenerateMessage = () => {
  const generateMessages = useQuery(GenerateMessage);

  const findAll = () => generateMessages.sorted('createdAt', true);

  return {
    findAll,
  }
}

export default useGenerateMessage;