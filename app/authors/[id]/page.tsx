import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import AuthorArticles from "@/components/AuthorArticles/AuthorArticles";
import styles from "./AuthorPage.module.css";

type Author = {
  _id: string;
  name: string;
  avatarUrl?: string;
  articlesAmount?: number;
};

const FALLBACK_AVATAR = "/images/default-avatar.png";

async function fetchAuthor(id: string): Promise<Author | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/authors/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch author");

  return res.json();
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author = await fetchAuthor(id);

  if (!author) {
    return { title: "Author not found | Harmoniq" };
  }

  return {
    title: `${author.name} | Harmoniq`,
    description: `Explore articles written by ${author.name} on Harmoniq.`,
    openGraph: {
      title: `${author.name} | Harmoniq`,
      description: `Explore articles written by ${author.name} on Harmoniq.`,
    },
  };
}

const AuthorPage = async ({ params }: Props) => {
  const { id } = await params;
  const author = await fetchAuthor(id);

  if (!author) {
    notFound();
  }

  const avatarSrc = author.avatarUrl?.trim() ? author.avatarUrl : FALLBACK_AVATAR;
  const articlesCount = author.articlesAmount ?? 0;
  const name = author.name?.split(" ")[0] ?? "Unknown";

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.header}>
            <Image
            src={avatarSrc}
            alt={author.name}
            width={137}
            height={137}
            className={styles.avatar}
            unoptimized
            />
            <div className={styles.info}>
              <p className={styles.name}>{name}</p>
              <p className={styles.count}>
                {articlesCount} {articlesCount === 1 ? "article" : "articles"}
              </p>
            </div>
          </div>

          <AuthorArticles ownerId={id} />
          </div>
        </div>
    </section>
  );
};

export default AuthorPage;