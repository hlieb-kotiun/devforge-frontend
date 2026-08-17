import type { Article } from "@/types/article";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import css from "./ArticlesList.module.css";

interface ArticlesListProps {
  articles: Article[];
  /** Опційний екшен у футері кожної картки (напр. кнопка закладок). */
  renderAction?: (article: Article) => React.ReactNode;
}

const ArticlesList = ({ articles, renderAction }: ArticlesListProps) => {
  if (articles.length === 0) {
    return <p className={css.empty}>No articles found.</p>;
  }

  return (
    <ul className={css.list}>
      {articles.map((article) => (
        <ArticleCard
          key={article._id}
          article={article}
          action={renderAction?.(article)}
        />
      ))}
    </ul>
  );
};

export default ArticlesList;
