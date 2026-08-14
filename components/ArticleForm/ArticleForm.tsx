"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

interface ArticleFormValues {
  title: string;
  content: string;
  image: File | null;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Заголовок має містити мінімум 5 символів")
    .required("Заголовок обов'язковий"),
  content: Yup.string()
    .min(20, "Текст має містити мінімум 20 символів")
    .required("Текст обов'язковий"),
  image: Yup.mixed().required("Фото обов'язкове"),
});

const ArticleForm: React.FC = () => {
  const router = useRouter();

  const initialValues: ArticleFormValues = {
    title: "",
    content: "",
    image: null,
  };

  const handleSubmit = async (
    values: ArticleFormValues,
    { setSubmitting }: FormikHelpers<ArticleFormValues>
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      if (values.image) formData.append("image", values.image);

      // додаємо поточну дату без поля у формі
      formData.append("date", new Date().toISOString());

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Помилка: ${error.message}`);
      } else {
        alert("Стаття успішно опублікована!");
        router.push("/articles");
      }
    } catch (err) {
      alert(`Помилка запиту: ${(err as Error).message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="title">Заголовок</label>
            <Field id="title" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="content">Текст</label>
            <Field as="textarea" id="content" name="content" />
            <ErrorMessage name="content" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="image">Фото</label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={(event) => {
                if (event.currentTarget.files) {
                  setFieldValue("image", event.currentTarget.files[0]);
                }
              }}
            />
            <ErrorMessage name="image" component="div" className="error" />
          </div>

          <button type="submit">Publish</button>
        </Form>
      )}
    </Formik>
  );
};

export default ArticleForm;
