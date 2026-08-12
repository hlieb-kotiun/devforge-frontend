import type { Metadata } from "next";
import AuthorsList from "@/components/AuthorsList/AuthorsList";
import styles from "./AuthorsPage.module.css";

export const metadata: Metadata = {
  title: "Authors | Harmoniq",
  description:
    "Discover the authors behind Harmoniq's articles and explore their work.",
  openGraph: {
    title: "Authors | Harmoniq",
    description:
      "Discover the authors behind Harmoniq's articles and explore their work.",
    url: "http://localhost:3000/authors",
  },
};

const AuthorsPage = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.innerWrapper}>
            <h1 className={styles.title}>Authors</h1>
            <AuthorsList />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AuthorsPage;
