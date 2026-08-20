"use client";

import Link from "next/link";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import styles from "./Hero.module.css";

export default function Hero() {
  const { data: user } = useCurrentUser();
  const isAuthenticated = Boolean(user);

  return (
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
            <Link href="/articles" className={styles.primaryButton}>
              Go to Articles
            </Link>

            {isAuthenticated ? (
              <Link href="/authors" className={styles.secondaryButton}>
                Go to Creators
              </Link>
            ) : (
              <Link href="/register" className={styles.secondaryButton}>
                Register
              </Link>
            )}
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
  );
}
