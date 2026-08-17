"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import css from "./RegisterForm.module.css";
import * as Yup from "yup";
import Link from "next/link";
import { register, RegisterRequest } from "@/lib/api";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { CURRENT_USER_QUERY_KEY } from "@/lib/hooks/useCurrentUser";
interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const RegisterFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name is too long")
    .required("Please enter valid name"),
  email: Yup.string()
    .email("Invalid email format")
    .max(64, "Email is too long")
    .required("Please enter valid email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password is too long")
    .required("Please enter valid password"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Repeat your password is required"),
});

export default function RegisterForm() {
  const fieldId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleSubmit = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>,
  ) => {
    try {
      const data: RegisterRequest = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      await register(data);
      await queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      actions.resetForm();
      router.push("/photo");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Registration failed";

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
      validationSchema={RegisterFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
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
                placeholder="Max"
                autoComplete="name"
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
                placeholder="email@gmail.com"
                autoComplete="email"
              />

              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
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
                  placeholder="*********"
                  autoComplete="new-password"
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
              <label
                htmlFor={`${fieldId}-confirmpassword`}
                className={css.label}
              >
                Repeat your password
              </label>

              <div className={css.inputWrapper}>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpassword"
                  id={`${fieldId}-confirmpassword`}
                  className={css.input}
                  placeholder="*********"
                  autoComplete="new-password"
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

            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create account"}
            </button>
          </Form>

          <p className={css.loginParagraph}>
            Already have an account?{" "}
            <Link href="/login" className={css.loginLink}>
              Log in
            </Link>
          </p>
        </div>
      )}
    </Formik>
  );
}
