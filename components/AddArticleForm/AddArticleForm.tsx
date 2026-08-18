"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Image from "next/image";
import styles from "./AddArticleForm.module.css";

interface ArticleFormValues {
  img: File | null;
  title: string;
  desc: string;
}

interface AddArticleFormProps {
  user: { username: string };
}

const initialValues: ArticleFormValues = {
  img: null,
  title: "",
  desc: "",
};

const validationSchema = Yup.object({
  img: Yup.mixed<File>()
    .nullable()
    .required("Please upload an image")
    .test("fileType", "Use JPEG, PNG, or WebP", (file) =>
      !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    )
    .test("fileSize", "File too large (max 1Mb)", (file) =>
      !file || file.size <= 1024 * 1024,
    ),
  title: Yup.string().trim().min(3).max(48).required("Title is required"),
  desc: Yup.string().trim().min(100).max(4000).required("Description is required"),
});

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function createArticle(values: ArticleFormValues, username: string) {
  const formData = new FormData();
  formData.append('img', values.img as File)
  formData.append("title", values.title.trim());
  formData.append("desc", values.desc.trim());
  formData.append("date", new Date().toISOString().slice(0, 10));
  formData.append("author", username);

   const response = await fetch(`${apiUrl}/articles`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Unable to publish article");
  }
  return response.json();
}


export default function AddArticleForm({ user }: AddArticleFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const mutation = useMutation({
  mutationFn: (values: ArticleFormValues) => createArticle(values, user.username),
  onSuccess: (data) => {
    toast.success("Article published successfully!");
    router.push(`/articles/${data._id}`); // редірект на сторінку статті
  },
  onError: (error: Error) => {
    toast.error(error.message);
  },
});

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File | null) => void,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("img", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (
    values: ArticleFormValues,
    { setSubmitting }: FormikHelpers<ArticleFormValues>,
  ) => mutation.mutate(values, { onSettled: () => setSubmitting(false) });

  return (
    <Formik<ArticleFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange
      validateOnBlur
    >
      {({ errors, touched, values, setFieldValue, handleBlur, isSubmitting }) => (
        <Form className={styles.createArticleForm}>
          {/* Image upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="img/jpeg,img/png,img/webp"
            className={styles.createArticleHiddenInput}
            onChange={(event) => handleFileChange(event, setFieldValue)}
          />
          <div className={styles.createArticlePhotoField}>
            <div
              className={styles.createArticlePhotoBox}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Article preview"
                  width={343}
                  height={222}
                  className={styles.createArticlePreviewImage}
                />
              ) : (
                <svg
                  className={styles.createArticleCameraIcon}
                  viewBox="0 0 98 82"
                  aria-hidden="true"
                >
                  <path d="M67.0063 47.0865C67.0063 55.6629 58.7352 62.6154 48.5323 62.6154C38.3294 62.6154 30.0584 55.6629 30.0584 47.0865C30.0584 38.5102 38.3294 31.5577 48.5323 31.5577C58.7352 31.5577 67.0063 38.5102 67.0063 47.0865Z" stroke="#070707" />
                  <path d="M0.5 68.5L0.500002 30.6514C0.500002 24.2908 6.63417 19.1346 14.2011 19.1346C19.3906 19.1346 24.1348 16.6699 26.4557 12.7682L29.5608 7.54802C32.1301 3.22851 37.3823 0.499982 43.1276 0.5L53.9372 0.500035C59.6824 0.500053 64.9345 3.22859 67.5039 7.54807L70.609 12.7683C72.9299 16.6701 77.674 19.1347 82.8636 19.1347C90.4305 19.1347 96.5647 24.2909 96.5647 30.6515V68.5C96.5647 75.5416 89.7737 81.25 81.3966 81.25H15.6681C7.29099 81.25 0.5 75.5416 0.5 68.5Z" stroke="#070707" />
                </svg>
              )}
            </div>
            {touched.img && errors.img && (
              <p className={styles.createArticleError}>{errors.img}</p>
            )}
          </div>

          {/* Title */}
          <div className={styles.createArticleTitleField}>
            <label htmlFor="title" className={styles.createArticleLabel}>
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter the title"
              className={styles.createArticleInput}
              value={values.title}
              onChange={(e) => setFieldValue("title", e.target.value)}
              onBlur={handleBlur}
            />
            {touched.title && errors.title && (
              <p className={styles.createArticleError}>{errors.title}</p>
            )}
          </div>

          {/* Text */}
          <div className={styles.createArticleTextField}>
            <textarea
              name="desc"
              placeholder="Enter a text"
              className={styles.createArticleTextarea}
              value={values.desc}
              onChange={(e) => setFieldValue("desc", e.target.value)}
              onBlur={handleBlur}
            />
            {touched.desc && errors.desc && (
              <p className={styles.createArticleError}>{errors.desc}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || mutation.isPending}
            className={styles.createArticleSubmitButton}
          >
            {mutation.isPending ? "Publishing..." : "Publish Article"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
