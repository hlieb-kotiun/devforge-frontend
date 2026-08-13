"use client";

import { useState } from "react";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import ArticlesList from "@/components/ArticlesList/ArticlesList";
import css from "./ArticlesPage.module.css";

type ArticlesFilter = "all" | "popular";

const ArticlesPage = () => {
  const [filter, setFilter] = useState<ArticlesFilter>("all");

  return (
    <main className={css.page}>
      <div className="container">
        <div className={css.header}>
          <SectionTitle>Articles</SectionTitle>

          <div className={css.controls}>
            <p className={css.count}>0 articles</p>

            <div className={css.filters}>
              <button
                type="button"
                className={filter === "all" ? css.activeFilter : css.filter}
                onClick={() => setFilter("all")}
              >
                All
              </button>

              <button
                type="button"
                className={filter === "popular" ? css.activeFilter : css.filter}
                onClick={() => setFilter("popular")}
              >
                Popular
              </button>
            </div>
          </div>
        </div>

        <ArticlesList articles={[]} />

        <button type="button" className={css.loadMore}>
          Load More
        </button>
      </div>
    </main>
  );
};

export default ArticlesPage;
