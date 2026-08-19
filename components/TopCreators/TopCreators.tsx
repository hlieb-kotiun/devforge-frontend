"use client";
///
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader } from "@/components/Loader/Loader";
import { fetchTopCreators } from "@/lib/api/topCreators";
import { AVATAR_PLACEHOLDER, getAvatarUrl } from "@/lib/utils/avatar";
import styles from "./TopCreators.module.css";
///
export const TopCreators = () => {
  const {
    data: creators = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["top-creators"],
    queryFn: fetchTopCreators,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load creators");
    }
  }, [error]);

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
        {isLoading && <Loader inline label="Loading creators" />}
        {isError && <p>Failed to load creators</p>}
        {!isLoading && !isError && creators.length === 0 && (
          <p>Creators not found</p>
        )}
        {!isLoading && !isError && creators.length > 0 && (
          <ul className={styles.creatorsList}>
            {creators.map((creator) => {
              const name = creator.name?.trim() || creator.username;
              const avatarUrl = getAvatarUrl(creator.avatarUrl);

              return (
                <li key={creator._id} className={styles.creatorCard}>
                  <Link
                    href={`/authors/${creator._id}`}
                    className={styles.creatorLink}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={avatarUrl}
                        alt={`${name}, Harmoniq creator`}
                        fill
                        sizes="(min-width: 375px) 160px, calc((100vw - 48px) / 2)"
                        className={styles.creatorImage}
                        unoptimized={avatarUrl === AVATAR_PLACEHOLDER}
                      />
                    </div>

                    <h3 className={styles.creatorName}>{name}</h3>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
