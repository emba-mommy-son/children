import { useQuery } from "@realm/react"
import { Sentiment } from "../schemas/SentimentSchema"

const useSentiment = () => {
  const sentiments = useQuery(Sentiment);

  const findAll = () => sentiments.sorted('createdAt', true);

  return {
    findAll,
  }
}

export default useSentiment;