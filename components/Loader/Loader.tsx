"use client";

import { Oval } from "react-loader-spinner";
import css from "./Loader.module.css";

interface LoaderProps {
  label?: string;
  /** Вбудований лоадер замість фулскрін-оверлея — коли вантажиться лише секція. */
  inline?: boolean;
}

export const Loader = ({ label = "Loading", inline = false }: LoaderProps) => {
  return (
    <div
      className={inline ? css.inline : css.overlay}
      role="status"
      aria-live="polite"
    >
      <Oval
        visible
        height={48}
        width={48}
        color="var(--green-darker)"
        secondaryColor="var(--green)"
        strokeWidth={4}
        strokeWidthSecondary={4}
        ariaLabel={label}
        wrapperClass={css.spinner}
      />
    </div>
  );
};
