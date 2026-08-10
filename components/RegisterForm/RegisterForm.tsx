"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useId, useState } from "react";
import css from "./RegisterForm.module.css";
import * as Yup from "yup";
import Link from "next/link";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const initionalValues: RegisterFormValues = {
  username: "Max",
  email: "email@gmail.com",
  password: "*********",
  confirmpassword: "*********",
};

const RegisterFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .max(64, "Email is too long")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password is too long")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password is too long")
    .required("Repeat your password is required"),
});

export default function RegisterForm() {
  const fieldId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>,
  ) => {
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initionalValues}
      validationSchema={RegisterFormSchema}
      onSubmit={handleSubmit}
    >
      <div className={css.conteinerform}>
        <h2 className={css.title}>Register</h2>
        <p className={css.subtitle}>
          Join our community of mindfulness and wellbeing!
        </p>

        <Form className={css.form}>
          <div className={css.fieldGroup}>
            <label htmlFor={`${fieldId}-username`} className={css.label}>
              Enter your name
            </label>
            <Field
              type="text"
              name="username"
              id={`${fieldId}-username`}
              className={css.input}
            />
            <ErrorMessage
              name="username"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor={`${fieldId}-email`} className={css.label}>
              Enter your email address
            </label>
            <Field
              type="email"
              name="email"
              id={`${fieldId}-email`}
              className={css.input}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor={`${fieldId}-password`} className={css.label}>
              Create a strong password
            </label>
            <div className={css.inputWrapper}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                id={`${fieldId}-password`}
                className={css.input}
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
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor={`${fieldId}-confirmpassword`} className={css.label}>
              Repeat your password
            </label>
            <div className={css.inputWrapper}>
              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmpassword"
                id={`${fieldId}-confirmpassword`}
                className={css.input}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className={css.iconButton}
              >
                <svg className={css.icon}>
                  <use
                    href={
                      showConfirmPassword
                        ? "/sprite.svg#Controls=eye-crossed, Type=stroke, Size=32px"
                        : "/sprite.svg#Controls=eye, Type=stroke, Size=32px"
                    }
                  />
                </svg>
              </button>
            </div>
            <ErrorMessage
              name="confirmpassword"
              component="span"
              className={css.error}
            />
          </div>

          <button type="submit" className={css.submitButton}>
            Create account
          </button>
        </Form>

        <p className={css.loginParagraph}>
          Already have an account?{" "}
          <span>
            <Link href="/login" className={css.loginLink}>
              Log in
            </Link>
          </span>
        </p>
      </div>
    </Formik>
  );
}
