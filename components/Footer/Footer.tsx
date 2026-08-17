"use client";
import Link from "next/link";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import css from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data: user } = useCurrentUser();
  const isAuthorized = Boolean(user);

  return (
    <footer className={css.footerSection}>
      <div className={`container ${css.footerContainer}`}>
        <Link href="/" className={css.logoLink}>
          <svg className={css.logo} width="149" height="35">
            <use href="/sprite.svg#icon-logo" />
          </svg>
        </Link>
        <p className={css.footerRights}>
          © {currentYear} Harmoniq. All rights reserved.
        </p>
        <ul className={css.list}>
          <li>
            <Link className={css.listLink} href="/articles">
              Articles
            </Link>
          </li>
          {isAuthorized && (
            <li>
              <Link className={css.listLink} href="/profile">
                Account
              </Link>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
