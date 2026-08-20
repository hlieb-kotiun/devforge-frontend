"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserBar from "../UserBar/UserBar";
import { LogoutModal } from "../LogoutModal/LogoutModal";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { getAvatarUrl } from "@/lib/utils/avatar";
import css from "./Header.module.css";

type HeaderProps = {
  isAuthorized?: boolean;
  userName?: string;
  userAvatar?: string;
};

const publicNavigation = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/authors", label: "Creators" },
  { href: "/login", label: "Log in" },
];

const privateNavigation = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/authors", label: "Creators" },
  { href: "/profile", label: "My profile" },
];

const Header = ({
  isAuthorized,
  userName,
  userAvatar,
}: HeaderProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { data: user } = useCurrentUser();

  const isAuthControlled = typeof isAuthorized === "boolean";
  const currentAuthState = isAuthControlled
    ? {
        isAuthorized,
        userName: userName ?? "User",
        userAvatar: getAvatarUrl(userAvatar),
      }
    : {
        isAuthorized: Boolean(user),
        userName: user?.name || user?.username || "User",
        userAvatar: getAvatarUrl(user?.avatarUrl, user?.avatar),
      };
  const navigation = currentAuthState.isAuthorized ? privateNavigation : publicNavigation;
  const action = currentAuthState.isAuthorized
    ? { href: "/articles/new", label: "Create an article" }
    : { href: "/register", label: "Join now" };
  const actionClass = currentAuthState.isAuthorized ? css.createArticleLink : css.joinLink;

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const openLogoutModal = () => {
    closeMenu();
    setIsLogoutModalOpen(true);
  };

  return (
    <header
      className={`${css.headerSection} ${currentAuthState.isAuthorized ? css.authorizedHeader : css.guestHeader} ${isMenuOpen ? css.menuOpen : ""}`}
    >
      <div className={`container ${css.headerContainer}`}>
        <Link href="/" className={css.logoLink} aria-label="Harmoniq home">
          <svg className={css.logo} width="149" height="35" aria-hidden="true">
            <use href="/sprite.svg#icon-logo" />
          </svg>
        </Link>

        <div className={css.headerActions}>
          <Link href={action.href} className={`${css.actionLink} ${css.headerAction} ${actionClass}`}>
            {action.label}
          </Link>
          <button
            className={`${css.menuButton} ${isMenuOpen ? css.closeButton : ""}`}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <svg className={css.closeIcon} width="32" height="32" aria-hidden="true">
                <use href="/sprite.svg#Controls=close, Type=stroke, Size=32px" />
              </svg>
            ) : (
              <svg className={css.menuIcon} width="20" height="16" aria-hidden="true">
                <use href="/sprite.svg#icon-burger-regular" />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`${css.menuPanel} ${isMenuOpen ? css.menuPanelOpen : ""}`}
          id="site-navigation"
        >
          <nav aria-label="Main navigation">
            <ul className={css.nav}>
              {navigation.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`${css.navLink} ${pathname === href ? css.activeLink : ""}`}
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href={action.href}
            className={`${css.actionLink} ${css.menuAction} ${actionClass}`}
            onClick={closeMenu}
          >
            {action.label}
          </Link>

          {currentAuthState.isAuthorized && (
            <UserBar
              name={currentAuthState.userName}
              avatar={currentAuthState.userAvatar}
              onLogout={openLogoutModal}
              onProfileNavigate={closeMenu}
            />
          )}
        </div>
      </div>

      {isLogoutModalOpen && <LogoutModal onClose={() => setIsLogoutModalOpen(false)} />}
    </header>
  );
};

export default Header;
