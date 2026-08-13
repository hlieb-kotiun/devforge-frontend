import { AboutUs } from "../components/AboutUs/AboutUs";         
import styles from "./page.module.css";
import PopularArticles from "@/components/PopularArticles/PopularArticles";
import Hero from "../components/Hero/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />   
      <AboutUs />
      <PopularArticles/>
    </main>     
  );
}
