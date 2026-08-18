import type { Article } from "@/types/article";
import css from "./ArticlesList.module.css";
import ArticlesItem2 from "../ArticlesItem2/ArticlesItem2";

interface ArticlesListProps {
  articles: Article[];
  forceSaved?: boolean;
  savedArticleIds?: string[];
}

const ArticlesList = ({
  articles,
  forceSaved,
  savedArticleIds,
}: ArticlesListProps) => {
  if (articles.length === 0) {
    return <p className={css.empty}>No articles found.</p>;
  }

  return (
    <ul className={css.list}>
      {articles.map((article) => (
        <li key={article._id}>
          <ArticlesItem2
            article={article}
            bookmarkActive={
              forceSaved || savedArticleIds?.includes(article._id)
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ArticlesList;
