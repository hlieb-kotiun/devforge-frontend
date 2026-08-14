export interface Article {
  _id: string;
  img: string;
  title: string;
  desc: string;
  article: string;
  rate: number;
  ownerId: {
<<<<<<< HEAD
   _id: string;
   name: string;
  }; 
  date: string;
  author: string
}
=======
    _id: string;
    name: string;
  };
  date: string;
  author: string;
}
>>>>>>> main
