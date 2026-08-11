export interface Article {
  _id: { $oid: string };
  img: string;
  title: string;
  desc: string;
  article: string;
  rate: number;
  ownerId: { $oid: string };
  date: string;
}
