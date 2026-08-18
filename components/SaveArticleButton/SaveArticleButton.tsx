"use client";

import { useState } from "react";
import ModalErrorSave from "@/components/ModalErrorSave/ModalErrorSave";
import styles from "./SaveArticleButton.module.css";

type SaveArticleButtonProps = {
  articleId: string;
};

export default function SaveArticleButton({
  articleId,
}: SaveArticleButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/saved-articles/${articleId}`,
        {
          method: isSaved ? "DELETE" : "POST",
          credentials: "include",
        },
      );

      console.log("SAVE STATUS:", response.status);
      console.log(
        "SAVE RESPONSE:",
        await response.clone().text(),
      );

      if (
        response.status === 401 ||
        response.status === 500
      ) {
        const errorText = await response.clone().text();

        if (errorText.includes("Missing access token")) {
          setIsErrorModalOpen(true);
          return;
        }
      }

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          `Failed to update saved article: ${response.status} ${errorText}`,
        );
      }

      setIsSaved((prev) => !prev);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.saveButton}
        onClick={handleSave}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? (
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

            <span
              className={styles.bookmarkIcon}
              aria-hidden="true"
            >
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

      {isErrorModalOpen && (
        <ModalErrorSave
          onClose={() => setIsErrorModalOpen(false)}
        />
      )}
    </>
  );
}
