export interface CurrentUser {
  _id: string;
  name: string;
  username?: string;
  avatar?: string;
  avatarUrl?: string;
  articlesAmount: number;
}
