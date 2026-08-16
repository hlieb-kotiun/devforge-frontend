export type TopCreator = {
  _id: string;
  username: string;
  name?: string;
  articlesAmount: number;
  avatarUrl?: string;
};

export type TopCreatorsResponse = {
  creators: TopCreator[];
};
