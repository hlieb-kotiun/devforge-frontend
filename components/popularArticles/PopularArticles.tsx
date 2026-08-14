"use client";

import React from "react";
import { getPopularArticles } from "@/lib/api";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import css from "./PopularArticles.module.css";
import type { Article } from "@/types/article";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PopularArticles() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [bookmarks, setBookmarks] = React.useState<string[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await getPopularArticles(4);
      setArticles(res.articles || res);
    };
    fetchData();
  }, []);

  const handleSave = (id: string) => {
    setBookmarks((prev) => [...prev, id]);
    router.push("/articles?filter=bookmarks");
  };

  const handleLoadMore = (id: string) => {
    router.push(`/articles/${id}`);
  };

  return (
    <section className={css.popularSection}>
      <div className={`container ${css.popularArticlesContainer}`}>
        <div className={css.popularContent}>
          <h2 className={css.popularTitle}>Popular Articles</h2>
          <Link className={css.popularLink} href="/articles">
            Go to all Articles
            <svg className={css.linkIcon} width={19} height={19}>
              <use href="/symbol-defs.svg#icon-top-right" />
            </svg>
          </Link>
        </div>

        <ul className={css.popularList}>
          {Array.isArray(articles) &&
            articles.map((article: Article) => (
              <ArticlesItem
                key={article._id}
                article={article}
                onLoadMore={handleLoadMore}
                onSave={handleSave}
              />
            ))}
        </ul>
      </div>
    </section>
  );
}
