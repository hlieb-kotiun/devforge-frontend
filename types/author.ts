export type Author = {
  _id: string;
  name: string;
  username?: string;
  avatarUrl: string;
  articlesAmount?: number;
};

export type AuthorsResponse = {
  authors: Author[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
};