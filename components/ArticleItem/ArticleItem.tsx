"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Article } from "@/types/article";
import css from "./ArticleItem.module.css";
import useAuthStore from "@/lib/store/authStore";
import ButtonAddToBookmarks from "../ButtonAddToBookmarks/ButtonAddToBookmarks";

interface ArticleItemProps {
  article: Article;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://devforge-backend-l7uv.onrender.com";

const ArticleItem = ({ article }: ArticleItemProps) => {
  const authorName = article.ownerId?.name
    ? article.ownerId.name.trim().split(" ")[0]
    : "Author";

  // const handleToggleSave = async () => {
  //   if (isSaving) return;
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //     return;
  //   }

  //   setIsSaving(true);
  //   try {
  //     const response = await fetch(
  //       `${API_BASE_URL}/saved-articles/${article._id.$oid}`,
  //       {
  //         method: isSaved ? "DELETE" : "POST",
  //       },
  //     );

  //     if (!response.ok) throw new Error("Помилка збереження");
  //     const updateUser = await response.json();

  //     setUser(updateUser);
  //   } catch (error) {
  //     console.error("Помилка при збереженні статті:", error);
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  // const handleDelete = async () => {
  //   const isConfirmed = window.confirm("Ви дійсно хочете видалити цю статтю?");
  //   if (!isConfirmed || isDeleting) return;

  //   setIsDeleting(true);
  //   try {
  //     const response = await fetch(
  //       `${API_BASE_URL}/articles/${article._id.$oid}`,
  //       {
  //         method: "DELETE",
  //       },
  //     );

  //     if (!response.ok) throw new Error("Не вдалося видалити статтю");

  //     router.refresh();
  //   } catch (error) {
  //     console.error("Помилка при видаленні:", error);
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };

  // // Перехід на сторінку редагування
  // const handleEdit = () => {
  //   router.push(`/articles/${article._id.$oid}/edit`);
  // };

  return (
    <div className={css.card}>
      <img className={css.card__image} src={article.img} alt={article.title} />

      <div className={css.card__content}>
        <span className={css.card__author}>{authorName}</span>
        <h3 className={css.card__title}>{article.title}</h3>
        <p className={css.card__description}>{article.desc}</p>
      </div>

      <ButtonAddToBookmarks article={article} />
    </div>
  );
};

export default ArticleItem;

// комент для коміту
