"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddArticleForm from "@/components/AddArticleForm/AddArticleForm";
import styles from "./CreateArticlePage.module.css";

const CreateArticlePage = () => {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/auth/me", {
      credentials: "include",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          router.replace("/login");
          return;
        }

        setIsAuthorizing(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        router.replace("/login");
      });

    return () => controller.abort();
  }, [router]);

  if (isAuthorizing) {
    return null;
  }

  return (
    <section className="">
      <div
        className={`container ${styles.createArticleContainer}`}
      >
        <h1 className={styles.createArticleTitle}>
          Create an article
        </h1>
        <AddArticleForm />
      </div>
    </section>
  );
};

export default CreateArticlePage;
