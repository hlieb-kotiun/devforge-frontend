"use client";
///
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchTopCreators } from "@/lib/api/topCreators";
import styles from "./TopCreators.module.css";

const FALLBACK_AVATAR = "/images/test-avatar.png";
///
export const TopCreators = () => {
  const {
    data: creators = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["top-creators"],
    queryFn: fetchTopCreators,
  });

  ///
  return (
    <section className={styles.section} aria-labelledby="top-creators-title">
      <div className={`container ${styles.topCreatorsContainer}`}>
        <div className={styles.headingRow}>
          <h2 id="top-creators-title" className={styles.title}>
            Top Creators
          </h2>

          <Link href="/authors" className={styles.allCreatorsLink}>
            <span>Go to all Creators</span>
            <span aria-hidden="true" className={styles.linkIcon} />
          </Link>
        </div>
        {isLoading && <p>Loading creators...</p>}
        {isError && <p>Failed to load creators</p>}
        {!isLoading && !isError && creators.length === 0 && (
          <p>Creators not found</p>
        )}
        {!isLoading && !isError && creators.length > 0 && (
          <ul className={styles.creatorsList}>
            {creators.map((creator) => {
              const name = creator.name?.trim() || creator.username;
              const avatarUrl = creator.avatarUrl?.trim() || FALLBACK_AVATAR;

              return (
                <li key={creator._id} className={styles.creatorCard}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={avatarUrl}
                      alt={`${name}, Harmoniq creator`}
                      fill
                      sizes="(min-width: 375px) 160px, calc((100vw - 48px) / 2)"
                      className={styles.creatorImage}
                    />
                  </div>

                  <h3 className={styles.creatorName}>{name}</h3>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
