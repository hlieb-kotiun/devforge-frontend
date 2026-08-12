'use client';

import { useMutation } from '@tanstack/react-query';

import css from './ButtonAddToBookmarks.module.css';

import {
  addArticleToSavedArticles,
  removeArticleFromSavedArticles,
} from './bookmarkApi';

interface ButtonAddToBookmarksProps {
  articleId: string;
  isAuthenticated: boolean;
  active?: boolean;
  onClickUnauthenticated: () => void;
}

const ButtonAddToBookmarks = ({
  articleId,
  isAuthenticated,
  active = false,
  onClickUnauthenticated,
}: ButtonAddToBookmarksProps) => {
  const addMutation = useMutation({
    mutationFn: () => addArticleToSavedArticles(articleId),
  });

  const removeMutation = useMutation({
    mutationFn: () => removeArticleFromSavedArticles(articleId),
  });

  const isPending = addMutation.isPending || removeMutation.isPending;

  const handleClick = () => {
    if (!isAuthenticated) {
      onClickUnauthenticated();
      return;
    }

    if (active) {
      removeMutation.mutate();
      return;
    }

    addMutation.mutate();
  };

  return (
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
  );
};

export default ButtonAddToBookmarks;
