<<<<<<< HEAD
import { AboutUs } from "../components/AboutUs/AboutUs";         
import styles from "./page.module.css";
import PopularArticles from "@/components/popularArticles/PopularArticles";
=======
import { AboutUs } from "../components/AboutUs/AboutUs";
import { TopCreators } from "../components/TopCreators/TopCreators";
>>>>>>> main
import Hero from "../components/Hero/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />   
      <AboutUs />
<<<<<<< HEAD
      <PopularArticles/>
    </main>     
=======
      <TopCreators />
    </main>
>>>>>>> main
  );
}
