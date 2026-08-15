"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";
import UserBar from "../UserBar/UserBar";
import { useBurgerStore } from "@/store/burgerStore";
import { useAuthStore } from "@/store/authStore";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header = () => {
  const pathname = usePathname();
  const isAuthorized = useAuthStore((state) => state.isAuthorized);
  const { isOpen, toggleMenu } = useBurgerStore();

  return (
    <>
      <header className={css.headerSection}>
        <div className={`container ${css.headerContainer}`}>
          <Link href="/" className={css.logoLink}>
            <svg className={css.logo} width="149" height="35">
              <use href="/sprite.svg#icon-logo" />
            </svg>
          </Link>

          <div
            className={`${css.burgerMenuContainer} ${
              isAuthorized ? css.authorizedBurgerMenuContainer : ""
            }`}
          >
            <ul className={css.nav}>
              <li>
                <Link
                  href="/"
                  className={`${css.navLink} ${
                    pathname === "/" ? css.activeLink : ""
                  }`}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/articles"
                  className={`${css.navLink} ${
                    pathname === "/articles" ? css.activeLink : ""
                  }`}
                >
                  Articles
                </Link>
              </li>

              <li>
                <Link
                  href="/authors"
                  className={`${css.navLink} ${
                    pathname === "/authors" ? css.activeLink : ""
                  }`}
                >
                  Creators
                </Link>
              </li>

              {isAuthorized ? (
                <li>
                  <Link
                    href="/profile"
                    className={`${css.navLink} ${
                      pathname === "/profile" ? css.activeLink : ""
                    }`}
                  >
                    My Profile
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className={`${css.navLink} ${
                      pathname === "/login" ? css.activeLink : ""
                    }`}
                  >
                    Log in
                  </Link>
                </li>
              )}
            </ul>
            {isAuthorized ? (
              <Link
                className={`${css.link} ${css.createArticleLink}`}
                href="/create-article"
              >
                Create an article
              </Link>
            ) : (
              <Link className={`${css.link} ${css.joinLink}`} href="/register">
                Join now
              </Link>
            )}
            {isAuthorized && <UserBar />}
            <button
              type="button"
              className={css.burgerBtn}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20">
                <use
                  className={css.burgerIcon}
                  href={
                    isOpen
                      ? "/sprite.svg#Controls=close, Type=stroke, Size=32px"
                      : "/sprite.svg#icon-burger-regular"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <BurgerMenu isAuthorized={isAuthorized} />
    </>
  );
};

export default Header;
