import Image from "next/image";
import Link from "next/link";
import styles from "./TopCreators.module.css";

const creators = [
  { name: "Naomi", image: "/images/creators/naomi.jpg" },
  { name: "Andrii", image: "/images/creators/andrii.jpg" },
  { name: "Emma", image: "/images/creators/emma.jpg" },
  { name: "Max", image: "/images/creators/max.jpg" },
  { name: "Tony", image: "/images/creators/tony.jpg" },
  { name: "Tailor", image: "/images/creators/tailor.jpg" },
] as const;

export const TopCreators = () => {
  return (
    <section className={styles.section} aria-labelledby="top-creators-title">
      <div className="container">
        <div className={styles.headingRow}>
          <h2 id="top-creators-title" className={styles.title}>
            Top Creators
          </h2>

          <Link href="/authors" className={styles.allCreatorsLink}>
            <span>Go to all Creators</span>
            <span aria-hidden="true" className={styles.linkIcon} />
          </Link>
        </div>

        <ul className={styles.creatorsList}>
          {creators.map((creator) => (
            <li key={creator.name} className={styles.creatorCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={creator.image}
                  alt={`${creator.name}, Harmoniq creator`}
                  fill
                  sizes="(min-width: 375px) 160px, calc((100vw - 48px) / 2)"
                  className={styles.creatorImage}
                />
              </div>
              <h3 className={styles.creatorName}>{creator.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
