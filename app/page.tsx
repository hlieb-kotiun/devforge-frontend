import ArticleItem from "@/components/ArticleItem/ArticleItem";
import type { Article } from "@/types/article";

const sampleArticle: Article = {
  _id: { $oid: "68498236a100312bea078fe6" },
  img: "https://ftp.goit.study/img/harmoniq/f12e886489f94b5886d03e95vn.jpg",
  title: "Коли тривога заповнює простір: шлях до спокою",
  desc: "Медитації, які допомагають відновити внутрішній спокій",
  article:
    "У кожного з нас бувають моменти, коли тривога наче туман огортає думки, не даючи побачити ясне небо. Це відчуття ніби нескінченний внутрішній шум, який здається нестерпним і безвихідним.",
  rate: 16,
  ownerId: { $oid: "6881563901add19ee16fd018" },
  date: "2025-03-27",
};

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <h1>HomePage</h1>
        <ArticleItem article={sampleArticle} />
      </div>
    </main>
  );
}
