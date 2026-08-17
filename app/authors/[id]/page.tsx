import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AuthorArticles from "@/components/AuthorArticles/AuthorArticles";
import UserProfileInfo from "@/components/UserProfileInfo/UserProfileInfo";
import { getAvatarUrl } from "@/lib/utils/avatar";
import styles from "./AuthorPage.module.css";

type Author = {
  _id: string;
  name: string;
  avatarUrl?: string;
  articlesAmount?: number;
};

type ArticlesResponse = {
  articles: unknown[];
  total: number;
  page: number;
  limit: number;
};

async function fetchAuthor(id: string): Promise<Author | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/authors/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch author");

  return res.json();
}

async function fetchAuthorArticlesTotal(id: string): Promise<number | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/author/${id}?page=1&limit=1`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;

    const data: ArticlesResponse = await res.json();
    return data.total; 
  } catch {
    return null;
  }
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

  const realTotal = await fetchAuthorArticlesTotal(id);
  const articlesCount = realTotal ?? author.articlesAmount ?? 0;
  const avatarSrc = getAvatarUrl(author.avatarUrl);
  const name = author.name?.split(" ")[0] ?? "Unknown";

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.profileInfo}>
            <UserProfileInfo
              name={name}
              avatarUrl={avatarSrc}
              articlesCount={articlesCount}
            />
          </div>

          <AuthorArticles ownerId={id} />
        </div>
      </div>
    </section>
  );
};

export default AuthorPage;
