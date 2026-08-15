import Hero from "../components/Hero/Hero";
import { AboutUs } from "../components/AboutUs/AboutUs";
import PopularArticles from "../components/popularArticles/PopularArticles";
import { TopCreators } from "../components/TopCreators/TopCreators";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <PopularArticles />
      <TopCreators />
    </main>
  );
}
