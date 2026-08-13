import { getPopularArticles } from '@/lib/api';
import ArticlesItem from '../ArticlesItem/ArticlesItem';
import Link from 'next/link';
import css from './PopularArticles.module.css'
import type { Article } from '@/types/article';

export default async function PopularArticles() {
  const data = await getPopularArticles(4);

  return (
    <section className={css.popularSection}>
      <div className="container">
        <div className={css.popularContent}>
        <h2 className={css.popularTitle}>Popular Articles</h2>
          <Link className={css.popularLink} href="/articles">Go to all Articles
          <svg className={css.linkIcon} width={19} height={19}>
              <use href="/symbol-defs.svg#icon-top-right" />
          </svg>
          </Link>   
        </div>

      <ul className={css.popularList}>
        {data.articles.map((article: Article) => (
          <ArticlesItem key={article._id} article={article} />
        ))}
        </ul>
        </div>
    </section>
  );
}
