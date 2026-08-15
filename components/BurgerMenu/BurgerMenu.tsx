"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBurgerStore } from "@/store/burgerStore";
import css from "./BurgerMenu.module.css";
interface BurgerMenuProps {
  isAuthorized: boolean;
}
export default function BurgerMenu({ isAuthorized }: BurgerMenuProps) {
  const pathname = usePathname();
  const { isOpen, closeMenu } = useBurgerStore();

  if (!isOpen) return null;

  return (
    <div className={css.menuWrapper}>
      <div className={css.menu}>
        <ul className={css.navList}>
          <li>
            <Link
              href="/"
              onClick={closeMenu}
              className={pathname === "/" ? css.activeLink : css.navLink}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/articles"
              onClick={closeMenu}
              className={
                pathname === "/articles" ? css.activeLink : css.navLink
              }
            >
              Articles
            </Link>
          </li>

          <li>
            <Link
              href="/authors"
              onClick={closeMenu}
              className={pathname === "/authors" ? css.activeLink : css.navLink}
            >
              Creators
            </Link>
          </li>

          {isAuthorized ? (
            <li>
              <Link
                href="/profile"
                onClick={closeMenu}
                className={
                  pathname === "/profile" ? css.activeLink : css.navLink
                }
              >
                My Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link
                href="/login"
                onClick={closeMenu}
                className={pathname === "/login" ? css.activeLink : css.navLink}
              >
                Log in
              </Link>
            </li>
          )}
        </ul>

        {isAuthorized ? (
          <Link
            href="/create-article"
            onClick={closeMenu}
            className={css.primaryBtn}
          >
            Create an article
          </Link>
        ) : (
          <Link href="/register" onClick={closeMenu} className={css.primaryBtn}>
            Join now
          </Link>
        )}

        {isAuthorized && (
          <div className={css.userBox}>
            <span>Naomi</span>
            <button type="button" className={css.logoutBtn}>
              <svg className={css.logoutIcon}>
                <use href="/sprite.svg#Generic=log-out, Size=32px" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
