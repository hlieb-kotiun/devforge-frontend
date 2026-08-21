"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Image from "next/image";
import styles from "./EditArticleItem.module.css";
import type { Article } from "@/lib/api/articles";
import { getArticleImageSrc } from "@/lib/utils/article";
import axios from "axios";

interface ArticleFormValues {
  img: File | null;
  title: string;
  desc: string;
}

interface EditArticleItemProps {
  article: Article;
}

const validationSchema = Yup.object({
  img: Yup.mixed<File>()
    .nullable()
    .test("fileType", "Use JPEG, PNG, or WebP", (file) =>
      !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    )
    .test("fileSize", "File too large (max 1Mb)", (file) =>
      !file || file.size <= 1024 * 1024,
    ),
  title: Yup.string().trim().min(3).max(48).required("Title is required"),
  desc: Yup.string().trim().min(100).max(4000).required("Description is required"),
});

async function updateArticle(values: ArticleFormValues, articleId: string) {
  let response;

  if (values.img instanceof File) {
    const formData = new FormData();
    formData.append("img", values.img);
    formData.append("title", values.title.trim());
    formData.append("desc", values.desc.trim());

    response = await axios.patch(`/api/articles/${articleId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  } else {
    response = await axios.patch(
      `/api/articles/${articleId}`,
      {
        title: values.title.trim(),
        desc: values.desc.trim(),
      },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  return response.data;
}

export default function EditArticleItem({ article }: EditArticleItemProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    getArticleImageSrc(article.img),
  );

  const initialValues: ArticleFormValues = {
    img: null,
    title: article.title || "",
    desc: article.desc || article.article || "",
  };
const queryClient = useQueryClient();

  const mutation = useMutation({
  mutationFn: async (values: ArticleFormValues) => {
    return await updateArticle(values, article._id);
  },
  onSuccess: () => {
    toast.success("Article updated successfully!");

    queryClient.invalidateQueries({ queryKey: ["articles"] });
    queryClient.invalidateQueries({ queryKey: ["article", article._id] });

    window.location.href = `/articles/${article._id}`;
  },
  onError: (error: Error) => {
    toast.error(error.message || "Failed to update article");
  },
});


  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File | null) => void,
    setFieldTouched: (field: string, isTouched?: boolean) => void,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("img", file);
      setFieldTouched("img", true);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async (
  values: ArticleFormValues,
  { setSubmitting }: FormikHelpers<ArticleFormValues>,
) => {
  try {
    await mutation.mutateAsync(values);
  } catch (err) {
    console.error("Submission failed:", err);
  } finally {
    setSubmitting(false);
  }
};

  return (
  <section className={styles.sectionWrapper}>
    <div className={'container'}>
      <h1 className={styles.editArticlePageTitle}>Edit article</h1>
      <Formik<ArticleFormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
        validateOnBlur
        enableReinitialize
      >
        {({ errors, touched, values, setFieldValue, setFieldTouched, handleBlur, isSubmitting }) => (
          <Form className={styles.editArticleForm}>
            {/* Image upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className={styles.editArticleHiddenInput}
              onChange={(event) => handleFileChange(event, setFieldValue, setFieldTouched)}
            />
            <div className={styles.editArticlePhotoField}>
              <div
                className={styles.editArticlePhotoBox}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
              >
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Article preview"
                    width={384}
                    height={276}
                    className={styles.editArticlePreviewImage}
                    unoptimized
                  />
                ) : (
                  <svg
                    className={styles.editArticleCameraIcon}
                    viewBox="0 0 98 82"
                    aria-hidden="true"
                  >
                    <path d="M67.0063 47.0865C67.0063 55.6629 58.7352 62.6154 48.5323 62.6154C38.3294 62.6154 30.0584 55.6629 30.0584 47.0865C30.0584 38.5102 38.3294 31.5577 48.5323 31.5577C58.7352 31.5577 67.0063 38.5102 67.0063 47.0865Z" stroke="#070707" />
                    <path d="M0.5 68.5L0.500002 30.6514C0.500002 24.2908 6.63417 19.1346 14.2011 19.1346C19.3906 19.1346 24.1348 16.6699 26.4557 12.7682L29.5608 7.54802C32.1301 3.22851 37.3823 0.499982 43.1276 0.5L53.9372 0.500035C59.6824 0.500053 64.9345 3.22859 67.5039 7.54807L70.609 12.7683C72.9299 16.6701 77.674 19.1347 82.8636 19.1347C90.4305 19.1347 96.5647 24.2909 96.5647 30.6515V68.5C96.5647 75.5416 89.7737 81.25 81.3966 81.25H15.6681C7.29099 81.25 0.5 75.5416 0.5 68.5Z" stroke="#070707" />
                  </svg>
                )}
              </div>
              {touched.img && errors.img && (
                <p className={styles.editArticleError}>{errors.img}</p>
              )}
            </div>

            {/* Title */}
            <div className={styles.editArticleTitleField}>
              <label htmlFor="title" className={styles.editArticleLabel}>
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter the title"
                className={styles.editArticleInput}
                value={values.title}
                onChange={(e) => setFieldValue("title", e.target.value)}
                onBlur={handleBlur}
              />
              {touched.title && errors.title && (
                <p className={styles.editArticleError}>{errors.title}</p>
              )}
            </div>

            {/* Text */}
            <div className={styles.editArticleTextField}>
              <textarea
                name="desc"
                placeholder="Enter a text"
                className={styles.editArticleTextarea}
                value={values.desc}
                onChange={(e) => setFieldValue("desc", e.target.value)}
                onBlur={handleBlur}
              />
              {touched.desc && errors.desc && (
                <p className={styles.editArticleError}>{errors.desc}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || mutation.isPending}
              className={styles.editArticleSubmitButton}
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </section>
);
}