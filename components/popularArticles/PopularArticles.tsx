import { getPopularArticles } from '@/lib/api';
import ArticlesItem from './ArticlesItem';
import Link from 'next/link';
import css from './PopularArticles.module.css'
import type { Article } from '@/types/article';

export default async function PopularArticles() {
  const data = await getPopularArticles(4);

  return (
    <section className="container">
      <div className={css.popularcontainer}>
        <h2 className={css.populartitle}>Popular Articles</h2>
        {/* тут додати іконку */}
        <Link className={css.popularlink } href="/articles">Go to all Articles</Link>
      </div>

      <ul className={css.popularlist}>
        {data.articles.map((article: Article) => (
          <ArticlesItem key={article._id} article={article} />
        ))}
      </ul>
    </section>
  );
}
