"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik, type FormikHelpers } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import styles from './ArticleForm.module.css';
import Image from "next/image";

interface ArticleFormValues {     
  image: File | null;
  title: string;
  text: string;
}

const initialValues: ArticleFormValues = { image: null, title: "", text: "" };

const validationSchema = Yup.object({
  image: Yup.mixed<File>()
    .nullable()
    .required("Please upload an image")
    .test("fileType", "Use a JPEG, PNG, or WebP image", (file) =>
      !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    ),
  title: Yup.string().trim().required("Title is required"),
  text: Yup.string().trim().required("Article text is required"),
});

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function createArticle(values: ArticleFormValues) {
  const formData = new FormData();
  formData.append("image", values.image as File);
  formData.append("title", values.title.trim());
  formData.append("text", values.text.trim());

  const response = await fetch(`${apiUrl}/articles`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new ApiError(
      typeof data.message === "string"
        ? data.message
        : response.status === 401
        ? "Please log in to publish an article"
        : "Unable to publish the article. Please try again.",
      response.status,
    );
  }
}

const AddArticleForm = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${apiUrl}/users/me`, { credentials: "include", signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          router.replace("/login");
          return;
        }
        setIsAuthorizing(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        toast.error("Unable to verify your authorization");
        router.replace("/login");
      });

    return () => controller.abort();
  }, [router]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const mutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      toast.success("Article published successfully!");
      router.push("/articles");
    },
    onError: (error: ApiError) => {
      if (error.status === 401 || error.status === 403) {
        router.replace("/login");
        return;
      }
      toast.error(error.message);
    },
  });

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File | null) => void,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("image", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (
    values: ArticleFormValues,
    { setSubmitting }: FormikHelpers<ArticleFormValues>,
  ) => mutation.mutate(values, { onSettled: () => setSubmitting(false) });

  if (isAuthorizing) {
    return <p aria-live="polite">Checking authorization...</p>;
  }

  return (
    <Formik<ArticleFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue, setFieldTouched, handleBlur, isSubmitting }) => (
        <Form className={styles.createArticleForm}>
          {/* Image upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            aria-label="Upload article photo"
            className={styles.createArticleHiddenInput}
            onChange={(event) => {
              handleFileChange(event, setFieldValue);
              setFieldTouched("image", true);
            }}
          />

          <div className={styles.createArticlePhotoField}>
            <div
              className={styles.createArticlePhotoBox}
              onClick={handlePhotoClick}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") handlePhotoClick();
              }}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Article preview"
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
            {touched.image && errors.image && (
              <p className={styles.createArticleError}>{errors.image}</p>
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
              onChange={(event) => setFieldValue("title", event.target.value)}
              onBlur={handleBlur}
              aria-invalid={touched.title && !!errors.title}
            />
            {touched.title && errors.title && (
              <p className={styles.createArticleError}>{errors.title}</p>
            )}
          </div>

          {/* Text */}
          <div className={styles.createArticleTextField}>
            <textarea
              name="text"
              placeholder="Enter a text"
              className={styles.createArticleTextarea}
              value={values.text}
              onChange={(event) => setFieldValue("text", event.target.value)}
              onBlur={handleBlur}
              aria-invalid={touched.text && !!errors.text}
            />
            {touched.text && errors.text && (
              <p className={styles.createArticleError}>{errors.text}</p>
            )}
          </div>

          {/* Submit */}
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
};

export default AddArticleForm;
