"use client";

import { useQuery, type QueryClient } from "@tanstack/react-query";
import { getAllSavedArticleIds } from "@/lib/api/profile";
import { useCurrentUser } from "./useCurrentUser";

export const SAVED_ARTICLE_IDS_KEY = ["savedArticleIds"] as const;

export function patchSavedArticleIds(
  queryClient: QueryClient,
  articleId: string,
  saved: boolean,
) {
  queryClient.setQueryData<string[]>(SAVED_ARTICLE_IDS_KEY, (previous = []) => {
    if (saved) {
      return previous.includes(articleId)
        ? previous
        : [...previous, articleId];
    }

    return previous.filter((id) => id !== articleId);
  });
}

export function useSavedArticleIds() {
  const { data: user } = useCurrentUser();

  return useQuery({
    queryKey: SAVED_ARTICLE_IDS_KEY,
    queryFn: getAllSavedArticleIds,
    enabled: Boolean(user),
    staleTime: 60_000,
    placeholderData: (previousData) => previousData,
  });
}
