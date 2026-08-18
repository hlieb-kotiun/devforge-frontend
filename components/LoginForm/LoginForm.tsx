"use client";

import { useId, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import css from "./LoginForm.module.css";
import Link from "next/link";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { login, LoginRequest } from "@/lib/api";
import { CURRENT_USER_QUERY_KEY } from "@/lib/hooks/useCurrentUser";

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
  const queryClient = useQueryClient();

  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    try {
      const data: LoginRequest = {
        email: values.email,
        password: values.password,
      };
      await login(data);
      await queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      actions.resetForm();
      router.push("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          `Login failed${error.response?.status ? ` (${error.response.status})` : ""}`;

        toast.error(message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className={css.conteinerform}>
          <h2 className={css.title}>Login</h2>

          <Form className={css.form}>
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

              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
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

              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className={css.loginParagraph}>
                Don’t have an account?{" "}
                <Link href="/register" className={css.loginLink}>
                  Register
                </Link>
              </p>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
