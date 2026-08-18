"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddArticleForm from "@/components/AddArticleForm/AddArticleForm";
import styles from "./CreateArticlePage.module.css";

const CreateArticlePage = () => {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/users/me", {
      credentials: "include",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          router.replace("/login");
          return;
        }

        const data = await response.json();
        setUser(data); // тут збереження користувача
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
    <section>
      <div className={`container ${styles.createArticleContainer}`}>
        <h1 className={styles.createArticleTitle}>Create an article</h1>
        {user && <AddArticleForm user={user} />} 
      </div>
    </section>
  );
};

export default CreateArticlePage;