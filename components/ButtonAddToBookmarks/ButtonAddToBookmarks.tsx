"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Article } from "@/types/article";
import css from "./ButtonAddToBookmarks.module.css";
import useAuthStore from "@/lib/store/authStore";

interface ArticleItemProps {
  article: Article;
}
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://devforge-backend-l7uv.onrender.com";

const ButtonAddToBookmarks = ({ article }: ArticleItemProps) => {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isOwner =
    isAuthenticated &&
    Boolean(user?._id?.$oid && user._id.$oid === article.ownerId?._id);

  const isSaved = true;
  //    Boolean(user?.savedArticles?.includes(article._id));

  const handleToggleSave = async () => {
    if (isSaving) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/saved-articles/${article._id}`,
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
      const response = await fetch(`${API_BASE_URL}/articles/${article._id}`, {
        method: "DELETE",
      });

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
    router.push(`/articles/${article._id}/edit`);
  };
  return (
    <div className={css.card__actions}>
      {/* Кнопка "Learn more" */}
      <Link
        href={`/articles/${article._id}`}
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
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <use href="/sprite.svg#icon-edit" />
            </svg>
          </button>

          {/* { <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`${css.card__btn} ${css.card__btn_icon}`}
            aria-label="Delete article"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <use href="/sprite.svg#Generic=delete,%20Size=32px" />
            </svg>
          </button>} */}
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
  );
};

export default ButtonAddToBookmarks;
