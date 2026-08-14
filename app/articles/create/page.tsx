"use client";

import AddArticleForm from "@/components/AddArticleForm/AddArticleForm";
import styles from "./CreateArticlePage.module.css";

const CreateArticlePage = () => {
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
