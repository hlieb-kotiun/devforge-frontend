import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import { getAuthorName } from "@/lib/utils/article";
import css from "./ArticleCard.module.css";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <li className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={article.img}
          alt={article.title}
          width={337}
          height={233}
          unoptimized
          className={css.image}
        />
      </div>

      <div className={css.content}>
        <p className={css.author}>{getAuthorName(article)}</p>

        <h2 className={css.title}>{article.title}</h2>

        <p className={css.description}>{article.desc}</p>

        <div className={css.footer}>
          <Link href={`/articles/${article._id}`} className={css.link}>
            Learn more
          </Link>

          {/* ButtonAddToBookmarks буде підключено після merge відповідної feature */}
        </div>
      </div>
    </li>
  );
};

export default ArticleCard;
