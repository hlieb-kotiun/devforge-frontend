import { AboutUs } from "../components/AboutUs/AboutUs";
import PopularArticles from "@/components/popularArticles/PopularArticles";
import { TopCreators } from "../components/TopCreators/TopCreators";
import Hero from "../components/Hero/Hero";

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
