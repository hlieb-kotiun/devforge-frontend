import { AboutUs } from "../components/AboutUs/AboutUs";
import Hero from "../components/Hero/Hero";
import styles from "../components/Hero/Hero.module.css";
import Link from "next/link";
export default function HomePage() {
  return (
    <main>
      <div className={styles.heroWrapper}>
        <section className={styles.hero}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Find your
              <br className={styles.desktopBreak} /> <span>harmony</span>
              <br className={styles.mobileTabletBreak} /> in
              <br className={styles.desktopBreak} /> community
            </h1>

            <div className={styles.actions}>
              <a href="#popular-articles" className={styles.primaryButton}>
                Go to Articles
              </a>

              <Link href="/register" className={styles.secondaryButton}>
                Register
              </Link>
            </div>
          </div>

          <picture className={styles.imageWrapper}>
            <source media="(min-width: 1440px)" srcSet="/hero-desktop.png" />

            <source media="(min-width: 768px)" srcSet="/hero-tablet.png" />

            <img
              src="/hero-mobile.png"
              alt="Harmoniq community"
              className={styles.heroImage}
            />
          </picture>
        </section>
      </div>
      <Hero />
      <AboutUs />
    </main>
  );
}
