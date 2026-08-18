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
              className={css.editIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path 
      d="M19.125 19.125L8.71154 19.125H4.875L4.875 15.281L12.8221 7.31853L14.4663 5.67111C15.5258 4.60963 17.2435 4.60963 18.3029 5.67111C19.3623 6.7326 19.3623 8.4536 18.3029 9.51508L16.6587 11.1625L8.71154 19.125M12.8221 7.31853L16.6587 11.1625" 
      fill="none"
      stroke="#374f42" 
      stroke-width="1" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
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
                fill="none"
                stroke="currentColor"
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
