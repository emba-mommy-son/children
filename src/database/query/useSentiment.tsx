import { useQuery } from "@realm/react"
import { Sentiment } from "../schemas/SentimentSchema"

export const useSentiment = () => {
  const sentiments = useQuery(Sentiment);

  const findAll = () => sentiments.sorted('createdAt', true);

  return {
    findAll,
  }
}