"use client";

import { Article } from "@/types/article.js";
import css from "./ArticleItem.module.css";
import { useRouter } from "next/navigation";
// import { authStore } from "@/lib/store/authStore";

interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  // const router = useRouter();
  // const isAuthenticated = authStore((state) => state.isAuthenticated);
  // const user = authStore((state) => state.user);

  return (
    <div className={css.card}>
      <img className={css.card__image} src={article.img} alt={article.title} />

      <div className={css.card__content}>
        <span className={css.card__author}>{article.ownerId.$oid}</span>
        <h3 className={css.card__title}>{article.title}</h3>
        <p className={css.card__description}>{article.desc}</p>
      </div>

      <div className={css.card__actions}>
        <button className={`${css.card__btn} ${css.card__btn_text}`}>
          Learn more
        </button>
        <button className={`${css.card__btn} ${css.card__btn_icon}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 3h14a2 2 0 0 1 2 2v16l-9-4-9 4V5a2 2 0 0 1 2-2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ArticleItem;
