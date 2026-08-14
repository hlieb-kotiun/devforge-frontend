"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Article } from "@/types/article";
import css from "./ArticleItem.module.css";
import useAuthStore from "@/lib/store/authStore";

interface ArticleItemProps {
  article: Article;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://devforge-backend-l7uv.onrender.com";

const ArticleItem = ({ article }: ArticleItemProps) => {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const authorName = article.ownerId?.name
    ? article.ownerId.name.trim().split(" ")[0]
    : "Author";

  const isOwner =
    isAuthenticated &&
    Boolean(user?._id?.$oid && user._id.$oid === article.ownerId?._id);

  const isSaved = Boolean(user?.savedArticles?.includes(article._id.$oid));

  const handleToggleSave = async () => {
    if (isSaving) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/saved-articles/${article._id.$oid}`,
        {
          method: isSaved ? "DELETE" : "POST",
        },
      );

      if (!response.ok) throw new Error("Помилка збереження");
      const updateUser = await response.json();

      setUser(updateUser);
    } catch (error) {
      console.error("Помилка при збереженні статті:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Ви дійсно хочете видалити цю статтю?");
    if (!isConfirmed || isDeleting) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/articles/${article._id.$oid}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Не вдалося видалити статтю");

      router.refresh();
    } catch (error) {
      console.error("Помилка при видаленні:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Перехід на сторінку редагування
  const handleEdit = () => {
    router.push(`/articles/${article._id.$oid}/edit`);
  };

  return (
    <div className={css.card}>
      <img className={css.card__image} src={article.img} alt={article.title} />

      <div className={css.card__content}>
        <span className={css.card__author}>{authorName}</span>
        <h3 className={css.card__title}>{article.title}</h3>
        <p className={css.card__description}>{article.desc}</p>
      </div>

      <div className={css.card__actions}>
        {/* Кнопка "Learn more" */}
        <Link
          href={`/articles/${article._id.$oid}`}
          className={`${css.card__btn} ${css.card__btn_text}`}
        >
          Learn more
        </Link>

        {/* Кнопка "Зберегти"  */}
        {isOwner ? (
          <>
            <button
              onClick={handleEdit}
              className={`${css.card__btn} ${css.card__btn_icon}`}
              aria-label="Edit article"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`${css.card__btn} ${css.card__btn_icon}`}
              aria-label="Delete article"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </>
        ) : (
          <button
            onClick={handleToggleSave}
            disabled={isSaving}
            className={`${css.card__btn} ${css.card__btn_icon} ${isSaved ? css.saved : ""}`}
            aria-label={isSaved ? "Remove from saved" : "Save article"}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill={isSaved ? "#ffffff" : "none"}
            >
              <use href="/sprite.svg#Generic=bookmark-alternative,%20Size=32px" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ArticleItem;

// комент для коміту
