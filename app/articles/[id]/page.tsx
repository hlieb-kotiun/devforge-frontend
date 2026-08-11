import Image from "next/image";
import Link from "next/link";
import { randomInt } from "node:crypto";
import SaveArticleButton from "./SaveArticleButton";

import {
  getArticleById,
  getArticles,
  getUserById,
  type Article,
} from "@/lib/api/articles";

import styles from "./ArticlePage.module.css";

type ArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getRandomArticles(
  articles: Article[],
  currentArticleId: string,
  amount: number,
) {
  const availableArticles = articles.filter(
    (item) => item._id !== currentArticleId,
  );

  const result: Article[] = [];

  while (
    availableArticles.length > 0 &&
    result.length < amount
  ) {
    const randomIndex = randomInt(availableArticles.length);

    result.push(availableArticles[randomIndex]);
    availableArticles.splice(randomIndex, 1);
  }

  return result;
}

function getAuthorName(user: {
  name?: string;
  username?: string;
}) {
  return user.name || user.username || "Unknown author";
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { id } = await params;

  const [article, articlesResponse] = await Promise.all([
    getArticleById(id),
    getArticles(1, 20),
  ]);

  const recommendedArticles = getRandomArticles(
    articlesResponse.articles,
    article._id,
    3,
  );

  const [author, ...recommendedAuthors] = await Promise.all([
    getUserById(article.ownerId),

    ...recommendedArticles.map((item) =>
      getUserById(item.ownerId),
    ),
  ]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{article.title}</h1>

        <div className={styles.imageWrapper}>
          <Image
            src={article.img}
            alt={article.title}
            fill
            sizes="(min-width: 1440px) 1226px, (min-width: 768px) 704px, 361px"
            priority
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.articleText}>
            {article.article
              .split("\n")
              .map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
          </div>

          <div className={styles.infoBlock}>
            <p className={styles.infoRow}>
              <span>Author</span>
              <span>{getAuthorName(author)}</span>
            </p>

            <p className={styles.infoRow}>
              <span>Publication date</span>
              <span>{article.date}</span>
            </p>

            <h2 className={styles.recommendationsTitle}>
              You can also interested
            </h2>

            <div className={styles.recommendations}>
              {recommendedArticles.map((item, index) => (
                <Link
                  key={item._id}
                  href={`/articles/${item._id}`}
                  className={styles.recommendationCard}
                >
                  <div className={styles.cardTop}>
                    <h3>{item.title}</h3>

                    <span
                      className={styles.arrowButton}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 17L17 7M9 7H17V15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <p>
                    {getAuthorName(
                      recommendedAuthors[index],
                    )}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <SaveArticleButton articleId={article._id} />
        </div>
      </div>
    </main>
  );
}