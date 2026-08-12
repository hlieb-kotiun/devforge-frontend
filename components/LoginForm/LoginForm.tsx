"use client";

import { useId, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import css from "./LoginForm.module.css";
import Link from "next/link";
import * as Yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}
const initialValues: LoginFormValues = {
  email: "",
  password: "",
};
const LoginFormSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .max(64, "Email is too long")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password is too long")
    .required("Password is required"),
});

export default function LoginForm() {
  const fieldId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    actions.resetForm();
    router.push("/profile");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginFormSchema}
      onSubmit={handleSubmit}
    >
      <div className={css.conteinerform}>
        <h2 className={css.title}>Login</h2>
        <Form>
          <div className={css.fieldGroup}>
            <label htmlFor={`${fieldId}-email`} className={css.label}>
              Enter your email address
            </label>
            <Field
              type="email"
              name="email"
              id={`${fieldId}-email`}
              className={css.input}
              autoComplete="email"
              placeholder="email@gmail.com"
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>
          <div className={css.fieldGroup}>
            <label htmlFor={`${fieldId}-password`} className={css.label}>
              Enter a password
            </label>
            <div className={css.inputWrapper}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                id={`${fieldId}-password`}
                className={css.input}
                autoComplete="current-password"
                placeholder="*********"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={css.iconButton}
              >
                <svg className={css.icon}>
                  <use
                    href={
                      showPassword
                        ? "/sprite.svg#Controls=eye-crossed, Type=stroke, Size=32px"
                        : "/sprite.svg#Controls=eye, Type=stroke, Size=32px"
                    }
                  />
                </svg>
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
            <button type="submit" className={css.submitButton}>
              Login
            </button>
            <p className={css.loginParagraph}>
              Don’t have an account?{" "}
              <Link href={"/register"} className={css.loginLink}>
                Register
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </Formik>
  );
}
