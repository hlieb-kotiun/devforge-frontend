"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import css from "./LogoutModal.module.css";
import { logout } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader } from "@/components/Loader/Loader";

interface LogoutModalProps {
  onClose: () => void;
}

export const LogoutModal = ({ onClose }: LogoutModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await logout();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to log out");
    } finally {
      // Тут пізніше буде clearAuth() і очищення store

      onClose();
      router.replace("/");
      router.refresh();
    }
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isLoading && event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoading, onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div
        className={css.modal}
        role="dialog"
        aria-modal="true"
        aria-busy={isLoading}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close logout modal"
        >
          <svg className={css.closeIcon} aria-hidden="true">
            <use href="/sprite.svg#Controls=close, Type=stroke, Size=32px" />
          </svg>
        </button>

        <h2 className={css.title} id="logout-modal-title">
          Are you sure?
        </h2>

        <p className={css.description} id="logout-modal-description">
          We will miss you!
        </p>

        <div className={css.actions}>
          <button
            className={css.logoutButton}
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            Log out
          </button>

          <button
            className={css.cancelButton}
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>

      {isLoading && <Loader label="Logging out" />}
    </div>,
    document.body,
  );
};
