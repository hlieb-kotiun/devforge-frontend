import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import { getAuthorName } from "@/lib/utils/article";
import css from "./ArticlesItem2.module.css";
import ButtonAddToBookmarks2 from "../ButtonAddToBookmarks2/ButtonAddToBookmarks2";

interface ArticlesItem2Props {
  article: Article;
  bookmarkActive?: boolean;
}

const ArticlesItem2 = ({ article, bookmarkActive }: ArticlesItem2Props) => {
  const authorName =
    getAuthorName(article, "Author").trim().split(" ")[0] || "Author";

  const imageSrc = article.img.startsWith("http")
    ? article.img
    : `${process.env.NEXT_PUBLIC_API_URL ?? ""}${article.img}`;

  return (
    <div className={css.card}>
      <div className={css.card__imageWrapper}>
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          sizes="(max-width: 375px) 100vw, 361px"
          unoptimized
          className={css.card__image}
        />
      </div>

      <div className={css.card__content}>
        <span className={css.card__author}>{authorName}</span>
        <h3 className={css.card__title}>{article.title}</h3>
        <p className={css.card__description}>{article.desc}</p>
      </div>

      <div className={css.card__actions}>
        <Link
          href={`/articles/${article._id}`}
          className={`${css.card__btn} ${css.card__btn_text}`}
        >
          Learn more
        </Link>
        <ButtonAddToBookmarks2 article={article} active={bookmarkActive} />
      </div>
    </div>
  );
};

export default ArticlesItem2;
