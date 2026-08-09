import React from 'react';
import Image from "next/image";

interface ArticleProps {
  image?: string;
  author: string;
  title: string;
  description: string;
}

const PopularArticlesItem: React.FC<ArticleProps> = ({ image, author, title, description }) => {
  return (
    <div className="article-item">
      {image && (
        <Image
          src={image}
          alt={title}
          width={400}  
          height={250}  
          className="article-image"
        />
      )}
      <h4 className="article-author">{author}</h4>
      <h3 className="article-title">{title}</h3>
      <p className="article-description">{description}</p>
      <button className="article-button">Learn more</button>
    </div>
  );
};

export default PopularArticlesItem;
