"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import ModalErrorSave from "@/components/ModalErrorSave/ModalErrorSave";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import {
  addArticleToSavedArticles,
  removeArticleFromSavedArticles,
} from "@/lib/api/bookmarkApi";

import css from "./ButtonAddToBookmarks.module.css";

interface ButtonAddToBookmarksProps {
  articleId: string;
  isAuthenticated?: boolean;
  active?: boolean;
  onSuccess?: () => void;
}

const ButtonAddToBookmarks = ({
  articleId,
  active = false,
  onSuccess,
}: ButtonAddToBookmarksProps) => {
  const [isSaved, setIsSaved] = useState(active);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  const isAuthenticated = !!currentUser;

  const addMutation = useMutation({
    mutationFn: () => addArticleToSavedArticles(articleId),

    onSuccess: () => {
      setIsSaved(true);
    },

    onError: error => {
      toast.error(error.message || "Failed to add article to bookmarks");
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeArticleFromSavedArticles(articleId),

    onSuccess: () => {
      setIsSaved(false);
      onSuccess?.();
    },

    onError: error => {
      toast.error(error.message || "Failed to remove article from bookmarks");
    },
  });

  const isPending =
    addMutation.isPending ||
    removeMutation.isPending ||
    isUserLoading;

  const handleClick = () => {
    if (isUserLoading || addMutation.isPending || removeMutation.isPending) {
      return;
    }

    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    if (isSaved) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  return (
    <>
      <button
        className={`${css.buttonAddToBookmarks} ${isSaved ? css.active : ""
          }`}
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-label={
          isAuthenticated
            ? isSaved
              ? "Remove from bookmarks"
              : "Add to bookmarks"
            : "Log in or register"
        }
      >
        {isPending ? (
          <span className={css.loader} aria-hidden="true" />
        ) : (
          <svg
            className={css.icon}
            width="24"
            height="24"
            viewBox="0 0 14 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6.74707 0.25C8.5743 0.250008 10.1842 0.499454 11.1738 0.697266C11.7593 0.81444 12.224 1.2142 12.3955 1.77246C12.7741 3.00512 13.3129 5.41231 13.2441 8.99512C13.1676 12.9795 12.4319 15.5278 11.9248 16.8262C11.7857 17.1823 11.3318 17.2733 11.0244 16.9492C10.4445 16.3376 9.62969 15.5113 8.84863 14.8369C8.45874 14.5003 8.0715 14.1967 7.72266 13.9756C7.38671 13.7627 7.04102 13.5957 6.74707 13.5957C6.59436 13.5957 6.42901 13.6403 6.26562 13.7041C6.09904 13.7691 5.91734 13.8616 5.72754 13.9717C5.34801 14.1919 4.91724 14.4951 4.47754 14.832C3.59701 15.5068 2.65927 16.3326 1.99023 16.9434C1.65047 17.2534 1.18076 17.1131 1.07715 16.7207C0.723783 15.3807 0.25 12.863 0.25 9C0.25 5.24709 0.752973 2.9191 1.10742 1.74414C1.27092 1.20221 1.72224 0.817176 2.29395 0.702148C3.28117 0.50352 4.90335 0.25 6.74707 0.25Z"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {isModalOpen && (
        <ModalErrorSave onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default ButtonAddToBookmarks;