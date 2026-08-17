"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import { Loader } from "@/components/Loader/Loader";
import { getMyArticles, getSavedArticles } from "@/lib/api/profile";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import type { Article, ArticlesResponse } from "@/types/article";
import ProfileArticlesView from "./ProfileArticlesView";

const LIMIT = 6;

interface ProfileArticlesProps {
  kind: "created" | "saved";
}

const ProfileArticles = ({ kind }: ProfileArticlesProps) => {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const ownerId = user?._id;

  const [pageCount, setPageCount] = useState(1);

  const listRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(0);

  const fetchPage = useCallback(
    (page: number): Promise<ArticlesResponse> =>
      kind === "created"
        ? getMyArticles(ownerId as string, page, LIMIT)
        : getSavedArticles(page, LIMIT),
    [kind, ownerId],
  );

  // Кожна сторінка — власний запит зі своїм page у ключі. Список виходить
  // похідним від кешу, тому помилка нової порції не стирає показані статті.
  const results = useQueries({
    queries: Array.from({ length: pageCount }, (_, index) => ({
      queryKey: ["profile-articles", kind, index + 1, LIMIT],
      queryFn: () => fetchPage(index + 1),
      enabled: kind === "saved" || Boolean(ownerId),
      staleTime: 60_000,
    })),
  });

  const items = useMemo(() => {
    const seen = new Set<string>();

    return results.reduce<Article[]>((acc, { data }) => {
      data?.articles.forEach((article) => {
        if (seen.has(article._id)) return;

        seen.add(article._id);
        acc.push(article);
      });

      return acc;
    }, []);
  }, [results]);

  const total = results[0]?.data?.total ?? 0;
  const hasMore = items.length < total;
  const isLoadingMore = results[pageCount - 1]?.isFetching ?? false;
  const error = results.find((result) => result.error)?.error;

  // Фоновий prefetch наступної сторінки — вимога ТЗ для динамічних списків.
  // Йде через queryClient, тож блокувального лоадера не показує.
  useEffect(() => {
    if (!hasMore) return;

    const nextPage = pageCount + 1;

    queryClient.prefetchQuery({
      queryKey: ["profile-articles", kind, nextPage, LIMIT],
      queryFn: () => fetchPage(nextPage),
      staleTime: 60_000,
    });
  }, [hasMore, pageCount, kind, fetchPage, queryClient]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // Фокус і скрол на першу нову картку. Через DOM, щоб не додавати проп
  // у спільний ArticleCard.
  useEffect(() => {
    const prevCount = prevCountRef.current;
    prevCountRef.current = items.length;

    if (prevCount === 0 || items.length <= prevCount) return;

    const card = listRef.current?.querySelectorAll("li")[prevCount];

    if (!card) return;

    card.tabIndex = -1;
    card.focus({ preventScroll: true });
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [items]);

  if (results[0]?.isPending) {
    return <Loader label="Loading articles" />;
  }

  return (
    <div ref={listRef}>
      <ProfileArticlesView articles={items} variant={kind} />

      {hasMore && (
        <LoadMoreButton
          onClick={() => setPageCount((current) => current + 1)}
          isLoading={isLoadingMore}
        />
      )}
    </div>
  );
};

export default ProfileArticles;
