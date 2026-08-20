"use client";

import ModalErrorSave from "@/components/ModalErrorSave/ModalErrorSave";
import { useToggleSavedArticle } from "@/lib/hooks/useToggleSavedArticle";
import styles from "./SaveArticleButton.module.css";

type SaveArticleButtonProps = {
  articleId: string;
};

export default function SaveArticleButton({
  articleId,
}: SaveArticleButtonProps) {
  const { isSaved, isSaving, isLoginModalOpen, closeLoginModal, toggleSaved } =
    useToggleSavedArticle(articleId);

  return (
    <>
      <button
        type="button"
        className={`${styles.saveButton} ${isSaved ? styles.saved : ""}`}
        onClick={toggleSaved}
        disabled={isSaving}
        aria-busy={isSaving}
        aria-pressed={isSaved}
        aria-label={isSaved ? "Remove from saved" : "Save article"}
      >
        {isSaving ? (
          <>
            <span
              className={styles.loadingSpinner}
              aria-hidden="true"
            />
            <span>Loading...</span>
          </>
        ) : (
          <>
            <span>{isSaved ? "Saved" : "Save"}</span>

            <span className={styles.bookmarkIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill={isSaved ? "currentColor" : "none"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 4.5C6.5 3.67 7.17 3 8 3H16C16.83 3 17.5 3.67 17.5 4.5V20L12 16.5L6.5 20V4.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </>
        )}
      </button>

      {isLoginModalOpen && <ModalErrorSave onClose={closeLoginModal} />}
    </>
  );
}
