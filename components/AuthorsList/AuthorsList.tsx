"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import AuthorsItem from "../AuthorsItem/AuthorsItem";
import { AuthorsResponse } from "@/types/author";
import styles from "./AuthorsList.module.css";
import toast from "react-hot-toast";
import { useEffect, useRef, useState  } from "react";

const PER_PAGE = 20;

const fetchAuthors = async (page: number): Promise<AuthorsResponse> => {
  const res = await axios.get<AuthorsResponse>("/api/authors", {
    params: { page, perPage: PER_PAGE },
  });
  return res.data;
};

const AuthorsList = () => {
  const [prevLength, setPrevLength] = useState(0);
  const firstNewItemRef = useRef<HTMLLIElement | null>(null);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage,isFetchNextPageError } =  
  useInfiniteQuery ({
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

  const authors = data?.pages.flatMap((page) => page.authors) ?? [];

   useEffect(() => {
    if (firstNewItemRef.current) {
      const node = firstNewItemRef.current;
      requestAnimationFrame(() => { 
      node.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      firstNewItemRef.current = null; 
    }
  }, [authors.length]);

  const handleLoadMore = () => {
    setPrevLength(authors.length);
    fetchNextPage();
  };

  if (isLoading) {
    return <p className={styles.message}>Завантаження...</p>;
  }

  if (isError && !data) {
    return <p className={styles.message}>Не вдалося завантажити авторів</p>;
  }

  if (authors.length === 0) {
    return <p className={styles.message}>Авторів поки немає</p>;
  }

  return (
    <>
      <ul className={styles.list}>
        {authors.map((author, index) => (
          <AuthorsItem 
          key={author._id} 
          author={author} 
          ref={index === prevLength ? firstNewItemRef : undefined}
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