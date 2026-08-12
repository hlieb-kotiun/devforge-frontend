"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
          {isAuthorized && (
            <div className={css.loggedInUserContainer}>
              <div className={css.loggedInUserAvatarContainer}>
                {/* В Image потрібно буде додати аватара для залогіниного користувача */}
                <Image
                  className={css.loggedInUserAvatar}
                  src="/images/test-avatar.png"
                  alt="User avatar"
                  width="32"
                  height="32"
                />
                <p className={css.loggedInUserName}>Test</p>
              </div>

              <button className={css.logoutBtn}>
                <svg className={css.logoutIcon} width="16" height="15">
                  <use href="/sprite.svg#icon-logout" />
                </svg>
              </button>
            </div>
          )}
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
