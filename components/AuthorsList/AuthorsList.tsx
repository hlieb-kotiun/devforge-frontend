"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import AuthorsItem from "../AuthorsItem/AuthorsItem";
import { AuthorsResponse } from "@/types/author";
import styles from "./AuthorsList.module.css";
import toast from "react-hot-toast";
import { useEffect } from "react";

const PER_PAGE = 20;

const fetchAuthors = async (page: number): Promise<AuthorsResponse> => {
  const res = await axios.get<AuthorsResponse>("/api/authors", {
    params: { page, perPage: PER_PAGE },
  });
  return res.data;
};

const AuthorsList = () => {
 const newItemsStartRef = useRef<HTMLLIElement | null>(null);

 const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage,  isFetchNextPageError } =
    useInfiniteQuery({
      queryKey: ["authors"],
      queryFn: ({ pageParam }) => fetchAuthors(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.page + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
    });

    useEffect(() => {
    if (isFetchNextPageError) {
      toast.error("Не вдалося завантажити ще авторів. Спробуйте ще раз.");
    }
  }, [isFetchNextPageError]);

  if (isLoading) {
    return <p className={styles.message}>Завантаження...</p>;
  }

  if (isError && !data) {
    return <p className={styles.message}>Не вдалося завантажити авторів</p>;
  }

  const authors = data?.pages.flatMap((page) => page.authors) ?? [];

  if (authors.length === 0) {
    return <p className={styles.message}>Авторів поки немає</p>;
  }

  const currentCount = authors.length;

  const handleLoadMore = async () => {
    await fetchNextPage();
    requestAnimationFrame(() => {
      newItemsStartRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <>
      <ul className={styles.list}>
        {authors.map((author, index) => (
          <AuthorsItem
            key={author._id}
            author={author}
            ref={index === currentCount ? newItemsStartRef : undefined}
          />
        ))}
      </ul>

      {hasNextPage && (
        <button
          type="button"
          className={styles.loadMoreButton}
          onClick={handleLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Завантаження..." : "Load More"}
        </button>
      )}
    </>
  );
};

export default AuthorsList;