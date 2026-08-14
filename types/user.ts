export interface User {
  _id: { $oid: string };
  username: string;
  avatarUrl: string;
  articlesAmount: number;
  email: string;
  avatar: string;
  savedArticles: string[];
  createdAt: string;
  updatedAt: string;
}
