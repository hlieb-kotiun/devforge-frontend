"use client";
import React, { useEffect, useState } from 'react';
import PopularArticlesItem from './PopularArticlesItem';
import Link from 'next/link';

interface Article {
  _id: string;
  image?: string;
  author: string;
  title: string;
  description: string;
}

const PopularArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('http://localhost:5000/articles?popular=true');
        const data: Article[] = await res.json();
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <section className="popular-articles">
      <div className="container">
        <div className="popular-header">
          <h2 className="popular-title">Popular Articles</h2>
          <Link href="/articles" className="popular-link">
            Go to all Articles
          </Link>
        </div>

        <div className="popular-list">
          {articles.map(article => (
            <PopularArticlesItem key={article._id} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularArticles;

