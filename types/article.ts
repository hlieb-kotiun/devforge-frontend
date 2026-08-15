export interface Article {
  _id: string;
  img: string;
  title: string;
  desc: string;
  article: string;
  rate: number;
  ownerId: {  
    _id: string;
    name: string;
  };
  date: string;
  author: string; 
}
