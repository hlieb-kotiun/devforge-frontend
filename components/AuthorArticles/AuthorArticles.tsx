"use client";

import { useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import ArticlesList from "@/components/ArticlesList/ArticlesList";
import type { Article } from "@/types/article";
import styles from "./AuthorArticles.module.css";

const ARTICLES_PER_PAGE = 12;

type ArticlesResponse = {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
};

type AuthorArticlesProps = {
  ownerId: string;
};

const fetchArticlesByAuthor = async (
  ownerId: string,
  page: number
): Promise<ArticlesResponse> => {
  const res = await axios.get<ArticlesResponse>(
    `/api/articles/author/${ownerId}`,
    { params: { page, limit: ARTICLES_PER_PAGE } }
  );
  return res.data;
};

const AuthorArticles = ({ ownerId }: AuthorArticlesProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const prevLengthRef = useRef(0);

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["authorArticles", ownerId],
    queryFn: ({ pageParam }) => fetchArticlesByAuthor(ownerId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const loadedArticles = lastPage.page * lastPage.limit;
      return loadedArticles < lastPage.total ? lastPage.page + 1 : undefined;
    },
  });

  useEffect(() => {
    if (error) {
      toast.error("Не вдалося завантажити статті автора");
    }
  }, [error]);

  const articles = useMemo(() => {
    return data?.pages.flatMap((page) => page.articles) ?? [];
  }, [data]);

useEffect(() => {
  if (prevLengthRef.current > 0 && listRef.current) {
    const items = listRef.current.querySelectorAll("li");
    const firstNewItem = items[prevLengthRef.current];
    if (firstNewItem) {
      requestAnimationFrame(() => {
        firstNewItem.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }
}, [articles.length]);

  const handleLoadMore = async () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    prevLengthRef.current = articles.length;
    await fetchNextPage();
  };

  return (
    <div ref={listRef}>
      {isLoading ? (
        <p className={styles.message}>Loading...</p>
      ) : (
        <ArticlesList articles={articles} />
      )}

      {hasNextPage && (
        <button
          type="button"
          className={styles.loadMoreButton}
          onClick={handleLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default AuthorArticles;