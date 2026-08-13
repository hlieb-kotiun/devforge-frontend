// TODO: тимчасова заглушка, видалити коли колега зробить реальний компонент
type ArticlesListProps = {
  ownerId: string;
};

const ArticlesList = ({ ownerId }: ArticlesListProps) => {
  return <p>TODO: articles list for author {ownerId}</p>;
};

export default ArticlesList;