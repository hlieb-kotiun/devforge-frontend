"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import type { ArticlesResponse } from "@/types/article";
import {
  addArticleToSavedArticles,
  removeArticleFromSavedArticles,
} from "@/lib/api/bookmarkApi";
import { useCurrentUser } from "./useCurrentUser";
import {
  SAVED_ARTICLE_IDS_KEY,
  patchSavedArticleIds,
  useSavedArticleIds,
} from "./useSavedArticleIds";

export function useToggleSavedArticle(
  articleId: string,
  active = false,
) {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();
  const { data: savedIds = [], isSuccess: hasSavedIds } = useSavedArticleIds();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const isAuthenticated = Boolean(currentUser);
  const isSaved = hasSavedIds ? savedIds.includes(articleId) : active;

  const toggleSaved = async () => {
    if (isSaving) return;

    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    const nextSaved = !isSaved;

    setIsSaving(true);
    patchSavedArticleIds(queryClient, articleId, nextSaved);

    if (!nextSaved) {
      queryClient.setQueriesData<ArticlesResponse>(
        { queryKey: ["profile-articles", "saved"] },
        (current) => {
          if (!current) return current;

          return {
            ...current,
            articles: current.articles.filter((item) => item._id !== articleId),
            total: Math.max(0, current.total - 1),
          };
        },
      );
    }

    try {
      if (nextSaved) {
        await addArticleToSavedArticles(articleId);
      } else {
        await removeArticleFromSavedArticles(articleId);
      }

      void queryClient.invalidateQueries({ queryKey: SAVED_ARTICLE_IDS_KEY });
      void queryClient.invalidateQueries({
        queryKey: ["profile-articles", "saved"],
      });
    } catch (error) {
      patchSavedArticleIds(queryClient, articleId, isSaved);
      void queryClient.invalidateQueries({
        queryKey: ["profile-articles", "saved"],
      });

      if (error instanceof Error && error.message.includes("log in")) {
        setIsLoginModalOpen(true);
        return;
      }

      toast.error(
        error instanceof Error ? error.message : "Failed to save article",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    currentUser,
    isAuthenticated,
    isSaved,
    isSaving,
    isLoginModalOpen,
    closeLoginModal: () => setIsLoginModalOpen(false),
    toggleSaved,
  };
}
