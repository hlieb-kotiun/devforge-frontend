"use client";

import { useRouter } from "next/navigation";
import type { Article } from "@/types/article";
import css from "./ButtonAddToBookmarks2.module.css";
import ModalErrorSave from "../ModalErrorSave/ModalErrorSave";
import { useToggleSavedArticle } from "@/lib/hooks/useToggleSavedArticle";

interface ArticleItemProps {
  article: Article;
  active?: boolean;
}

const ButtonAddToBookmarks2 = ({
  article,
  active = false,
}: ArticleItemProps) => {
  const router = useRouter();
  const {
    currentUser,
    isAuthenticated,
    isSaved,
    isSaving,
    isLoginModalOpen,
    closeLoginModal,
    toggleSaved,
  } = useToggleSavedArticle(article._id, active);

  const ownerId =
    typeof article.ownerId === "string" ? article.ownerId : article.ownerId._id;

  const isOwner =
    isAuthenticated && Boolean(currentUser?._id && currentUser._id === ownerId);

  const handleEdit = () => {
    router.push(`/articles/${article._id}/edit`);
  };

  return (
    <>
      <div className={css.root}>
        {isOwner ? (
          <button
            type="button"
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
              aria-hidden="true"
            >
              <use href="/sprite.svg#icon-edit" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleSaved}
            disabled={isSaving}
            aria-busy={isSaving}
            className={`${css.card__btn} ${css.card__btn_icon} ${isSaved ? css.saved : ""} ${isSaving ? css.loading : ""}`}
            aria-label={isSaved ? "Remove from saved" : "Save article"}
          >
            {isSaving ? (
              <span className={css.spinner} aria-hidden="true" />
            ) : (
              <svg
                className={css.bookmarkIcon}
                width="24"
                height="24"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <use href="/sprite.svg#Generic=bookmark-alternative,%20Size=32px" />
              </svg>
            )}
          </button>
        )}
      </div>

      {isLoginModalOpen && <ModalErrorSave onClose={closeLoginModal} />}
    </>
  );
};

export default ButtonAddToBookmarks2;
