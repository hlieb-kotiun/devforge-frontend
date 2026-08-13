"use client";

import { Oval } from "react-loader-spinner";
import css from "./Loader.module.css";

interface LoaderProps {
  label?: string;
}

export const Loader = ({ label = "Loading" }: LoaderProps) => {
  return (
    <div className={css.overlay} role="status" aria-live="polite">
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
