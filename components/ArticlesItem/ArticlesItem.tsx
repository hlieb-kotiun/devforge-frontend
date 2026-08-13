import React from 'react';
import Image from 'next/image';
import css from './ArticlesItem.module.css'
import type { Article } from '@/types/article';

const ArticlesItem: React.FC<{ article: Article }> = ({ article }) => {
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
      <div>
        {/* кнопка load more */}
        </div>
    </li>
  );
};

export default ArticlesItem;
