"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";
import UserBar from "../UserBar/UserBar";

const Header = () => {
  const pathname = usePathname();

  //Для зручності константа імітація залогованого користувача
  const isAuthorized = true;

  const handleLogoutClick = () => {};

  return (
    <header className={css.headerSection}>
      <div className={`container ${css.headerContainer}`}>
        <Link href="/" className={css.logoLink}>
          <svg className={css.logo} width="149" height="35">
            <use href="/sprite.svg#icon-logo" />
          </svg>
        </Link>
        <div
          className={`${css.burgerMenuContainer} ${isAuthorized ? css.authorizedBurgerMenuContainer : ""}`}
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
                  log In
                </Link>
              </li>
            )}
          </ul>
          {isAuthorized ? (
            <Link className={`${css.link} ${css.createArticleLink}`} href="*">
              Create an article
            </Link>
          ) : (
            <Link className={`${css.link} ${css.joinLink}`} href="*">
              Join now
            </Link>
          )}
          {isAuthorized && <UserBar />}
          <button className={css.burgerBtn} onClick={handleLogoutClick}>
            <svg height="12" width="17">
              <use
                className={css.burgerIcon}
                href="/sprite.svg#icon-burger-regular"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
