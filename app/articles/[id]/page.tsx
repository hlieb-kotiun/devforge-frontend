import Link from "next/link";
import Image from "next/image";
import { getArticleById, getArticles } from "@/lib/api/articles";
import styles from "./ArticlePage.module.css";

type ArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;

  const article = await getArticleById(id);
  const articlesResponse = await getArticles(1, 20);

  const recommendedArticles = articlesResponse.articles
    .filter((item) => item._id !== id)
    .slice(0, 3);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{article.title}</h1>

        <div className={styles.imageWrapper}>
          <Image
            src={article.img}
            alt={article.title}
            fill
            sizes="(min-width: 1440px) 1224px, (min-width: 768px) 704px, calc(100vw - 32px)"
            priority
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.articleText}>
            {article.article.split("/n").map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>

          <div className={styles.infoBlock}>
            <p className={styles.infoRow}>
              <span>Author</span>
              <span>{article.ownerId}</span>
            </p>

            <p className={styles.infoRow}>
              <span>Publication date</span>
              <span>{article.date}</span>
            </p>

            <h2 className={styles.recommendationsTitle}>
              You can also interested
            </h2>

            <div className={styles.recommendations}>
              {recommendedArticles.map((item) => (
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

                  <p>{item.ownerId}</p>
                </Link>
              ))}
            </div>
          </div>

          <button type="button" className={styles.saveButton}>
            <span>Save</span>

            <span
              className={styles.bookmarkIcon}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 4.75C6 3.78 6.78 3 7.75 3H16.25C17.22 3 18 3.78 18 4.75V21L12 17L6 21V4.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}