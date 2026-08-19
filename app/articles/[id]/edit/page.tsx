import EditArticleItem from "@/components/EditAtricleItem/EditArticleItem";
import { getArticleById } from "@/lib/api/articles";

type EditArticlePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <main>
      <EditArticleItem article={article} />
    </main>
  );
}