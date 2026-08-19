"use client";

import { useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import SectionTitle from "@/components/SectionTitle/SectionTitle";
import ArticlesList from "@/components/ArticlesList/ArticlesList";
import { getArticles, type ArticlesFilter } from "@/lib/api";

import css from "./ArticlesPage.module.css";

const ARTICLES_PER_PAGE = 6;

const ArticlesPage = () => {
  const [filter, setFilter] = useState<ArticlesFilter>("all");

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["articles", filter],
    queryFn: ({ pageParam }) =>
      getArticles(pageParam, ARTICLES_PER_PAGE, filter),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const loadedArticles = lastPage.page * lastPage.limit;

      return loadedArticles < lastPage.total ? lastPage.page + 1 : undefined;
    },
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load articles");
    }
  }, [error]);

  const articles = useMemo(() => {
    return data?.pages.flatMap((page) => page.articles) ?? [];
  }, [data]);

  const total = data?.pages[0]?.total ?? 0;

  const handleFilterChange = (newFilter: ArticlesFilter) => {
    if (newFilter === filter) {
      return;
    }

    setFilter(newFilter);
  };

  const handleLoadMore = async () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    await fetchNextPage();
  };

  return (
    <main className={css.page}>
      <div className={'container'}>
        <div className={css.header}>
          <SectionTitle>Articles</SectionTitle>

          <div className={css.controls}>
            <p className={css.count}>
              {total} {total === 1 ? "article" : "articles"}
            </p>

            <div className={css.filters}>
              <button
                type="button"
                className={filter === "all" ? css.activeFilter : css.filter}
                onClick={() => handleFilterChange("all")}
              >
                All
              </button>

              <button
                type="button"
                className={filter === "popular" ? css.activeFilter : css.filter}
                onClick={() => handleFilterChange("popular")}
              >
                Popular
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <p>Loading articles...</p>
        ) : (
          <ArticlesList articles={articles} />
        )}

        {hasNextPage && (
          <button
            type="button"
            className={css.loadMore}
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </main>
  );
};

export default ArticlesPage;
