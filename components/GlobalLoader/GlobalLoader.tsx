"use client";

import { createPortal } from "react-dom";
import { useLoaderStore } from "@/lib/store/globalLoaderStore";
import css from "./GlobalLoader.module.css";

export const GlobalLoader = () => {
  const isLoading = useLoaderStore((state) => state.isLoading);

  if (!isLoading) return null;

  return createPortal(
    <div className={css.backdrop}>
      <div className={css.spinner} />
    </div>,
    document.body,
  );
};
