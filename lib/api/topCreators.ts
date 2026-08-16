import axios from "axios";
import type { TopCreator, TopCreatorsResponse } from "@/types/creator";

export const fetchTopCreators = async (): Promise<TopCreator[]> => {
  const response = await axios.get<TopCreatorsResponse>(
    "/api/authors/top-creators",
  );

  return response.data.creators;
};
