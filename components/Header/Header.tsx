"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserBar from "../UserBar/UserBar";
import { LogoutModal } from "../LogoutModal/LogoutModal";
import css from "./Header.module.css";

type HeaderProps = {
  isAuthorized?: boolean;
  userName?: string;
  userAvatar?: string;
};

type CurrentUser = {
  name?: string;
  username?: string;
  avatarUrl?: string;
  avatar?: string;
};

type AuthState = {
  isAuthorized: boolean;
  userName: string;
  userAvatar: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const DEFAULT_AVATAR = "/images/test-avatar.png";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getCurrentUser = (data: unknown): CurrentUser | null => {
  if (!isRecord(data)) return null;

  if (isRecord(data.user)) return data.user as CurrentUser;
  if (isRecord(data.data) && isRecord(data.data.user)) {
    return data.data.user as CurrentUser;
  }
  if (isRecord(data.data)) return data.data as CurrentUser;

  return data as CurrentUser;
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
  const [authState, setAuthState] = useState<AuthState>({
    isAuthorized: isAuthorized ?? false,
    userName: userName ?? "User",
    userAvatar: userAvatar ?? DEFAULT_AVATAR,
  });
  const isAuthControlled = typeof isAuthorized === "boolean";
  const currentAuthState = isAuthControlled
    ? {
        isAuthorized,
        userName: userName ?? "User",
        userAvatar: userAvatar ?? DEFAULT_AVATAR,
      }
    : authState;
  const navigation = currentAuthState.isAuthorized ? privateNavigation : publicNavigation;
  const action = currentAuthState.isAuthorized
    ? { href: "/articles/new", label: "Create an article" }
    : { href: "/register", label: "Join now" };
  const actionClass = currentAuthState.isAuthorized ? css.createArticleLink : css.joinLink;

  useEffect(() => {
    if (isAuthControlled) return;

    const controller = new AbortController();

    const loadCurrentUser = async () => {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) {
          setAuthState((state) => ({ ...state, isAuthorized: false }));
          return;
        }

        const user = getCurrentUser(await response.json());
        setAuthState({
          isAuthorized: true,
          userName: user?.name ?? user?.username ?? "User",
          userAvatar: user?.avatarUrl ?? user?.avatar ?? DEFAULT_AVATAR,
        });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setAuthState((state) => ({ ...state, isAuthorized: false }));
        }
      }
    };

    void loadCurrentUser();
    return () => controller.abort();
  }, [isAuthControlled, pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

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
              onLogout={() => setIsLogoutModalOpen(true)}
            />
          )}
        </div>
      </div>

      {isLogoutModalOpen && <LogoutModal onClose={() => setIsLogoutModalOpen(false)} />}
    </header>
  );
};

export default Header;
