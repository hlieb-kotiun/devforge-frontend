import { AboutUs } from "../components/AboutUs/AboutUs";
import { TopCreators } from "../components/TopCreators/TopCreators";
import Hero from "../components/Hero/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <TopCreators />
    </main>
  );
}
