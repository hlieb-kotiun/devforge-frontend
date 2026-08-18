import ArticlesEmptyState from "@/components/ArticlesEmptyState/ArticlesEmptyState";
import ArticlesList from "@/components/ArticlesList/ArticlesList";
import type { Article } from "@/types/article";

interface ProfileArticlesViewProps {
  articles: Article[];
  variant: "created" | "saved";
  forceSaved?: boolean;
}

const ProfileArticlesView = ({
  articles,
  variant,
  forceSaved,
}: ProfileArticlesViewProps) => {
  if (articles.length > 0) {
    return <ArticlesList articles={articles} forceSaved={forceSaved} />;
  }

  const isCreated = variant === "created";

  return (
    <ArticlesEmptyState
      description={
        isCreated ? "Write your first article" : "Save your first article"
      }
      linkHref={isCreated ? "/articles/create" : "/articles"}
      linkLabel={isCreated ? "Create an article" : "Go to articles"}
    />
  );
};

export default ProfileArticlesView;
