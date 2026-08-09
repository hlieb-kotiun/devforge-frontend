import type { Metadata } from "next";
import AuthorsList from "@/components/AuthorsList/AuthorsList";

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
    <section className="">
      <div className={`container`}>
        {/* Test h1 tag, must be deleted */}
        <h1>Authors</h1>{" "}
        <AuthorsList />
      </div>
    </section>
  );
};
export default AuthorsPage;
