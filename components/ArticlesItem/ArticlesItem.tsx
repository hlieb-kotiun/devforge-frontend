import React from 'react';
import Image from 'next/image';
import css from './ArticlesItem.module.css'
import type { Article } from '@/types/article';

interface ArticlesItemProps {
  article: Article;
  onLoadMore: (id: string) => void;
  onSave: (id: string) => void;
}

const ArticlesItem: React.FC<ArticlesItemProps> = ({ article, onLoadMore, onSave }) => {
  return (
    <li className={css.popularItem}>
      <Image
        src={article.img.startsWith('http')
          ? article.img
          : `${process.env.NEXT_PUBLIC_API_URL}${article.img}`}
        alt={article.title}
        unoptimized
        width={337}
        height={233}
        className={css.cardImage}
      />

      <div className={css.popularCardContent}>
        <p className={css.popularCardAuthor}>
            {article.ownerId?.name || 'Автор невідомий'}
        </p>
        <h3 className={css.popularCardTitle}>{article.title}</h3>
        <p className={css.popularCardDesc}>{article.desc}</p>
      </div>
      <div className={css.buttonsContainer}>
         <button
          className={css.loadMore}
          onClick={() => onLoadMore(article._id)}
        >
          Load more
        </button>
        <button
          className={css.save}
          onClick={() => onSave(article._id)}
        >
          <svg width={13.5} height={18}>
            <use href='/symbol-defs.svg#icon-Vector-5'></use>
          </svg>
        </button>
        </div>
    </li>
  );
};

export default ArticlesItem;
