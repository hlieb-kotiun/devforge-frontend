'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import ModalErrorSave from '@/components/ModalErrorSave/ModalErrorSave';
import css from './ButtonAddToBookmarks.module.css';

import {
  addArticleToSavedArticles,
  removeArticleFromSavedArticles,
} from '@/lib/api/bookmarkApi';

interface ButtonAddToBookmarksProps {
  articleId: string;
  isAuthenticated: boolean;
  active?: boolean;
}

const ButtonAddToBookmarks = ({
  articleId,
  isAuthenticated,
  active = false,
}: ButtonAddToBookmarksProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addMutation = useMutation({
    mutationFn: () => addArticleToSavedArticles(articleId),
    onError: error => {
      toast.error(error.message || 'Failed to add article to bookmarks');
    },
  });
  const removeMutation = useMutation({
    mutationFn: () => removeArticleFromSavedArticles(articleId),
    onError: error => {
      toast.error(error.message || 'Failed to remove article from bookmarks');
    },
  });

  const isPending = addMutation.isPending || removeMutation.isPending;

  const handleClick = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    if (active) {
      removeMutation.mutate();
      return;
    }

    addMutation.mutate();
  };

  return (
    <>
      <button
        className={`${css.buttonAddToBookmarks} ${active ? css.active : ''}`}
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-label={
          isAuthenticated
            ? active
              ? 'Remove from bookmarks'
              : 'Add to bookmarks'
            : 'Log in or register'
        }
      >
        {isPending ? (
          <span className={css.loader} aria-hidden="true" />
        ) : (
          <svg
            className={css.icon}
            width="24"
            height="24"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <use href="/sprite.svg#Generic=bookmark-alternative, Size=32px" />
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
