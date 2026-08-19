export interface ArticleOwner {
  _id: string;
  name?: string;
  username?: string;
}

export interface Article {
  _id: string;
  img: string;
  title: string;
  desc: string;
  article?: string;
  rate: number;
  // Бек populate-ить ownerId не в усіх ендпоїнтах, тож може прийти сирий id.
  ownerId: string | ArticleOwner;
  date: string;
  author: string;
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
}
