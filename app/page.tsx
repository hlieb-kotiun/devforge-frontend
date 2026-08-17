import { AboutUs } from "../components/AboutUs/AboutUs";
import PopularArticles from "@/components/popularArticles/PopularArticles";
import { TopCreators } from "../components/TopCreators/TopCreators";
import Hero from "../components/Hero/Hero";
import { Loader } from "@/components/Loader/Loader";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Loader />
      <AboutUs />
      <PopularArticles />
      <TopCreators />
    </main>
  );
}
