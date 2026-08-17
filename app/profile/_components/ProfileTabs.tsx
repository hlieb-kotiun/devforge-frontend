"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import css from "../Profile.module.css";

const ProfileTabs = () => {
  const activeSegment = useSelectedLayoutSegment("articles");
  const isSavedActive = activeSegment === "saved";

  return (
    <nav className={css.tabs} aria-label="Profile articles">
      <Link
        href="/profile"
        className={!isSavedActive ? css.activeTab : css.tab}
        aria-current={!isSavedActive ? "page" : undefined}
      >
        My Articles
      </Link>

      <Link
        href="/profile/saved"
        className={isSavedActive ? css.activeTab : css.tab}
        aria-current={isSavedActive ? "page" : undefined}
      >
        Saved Articles
      </Link>
    </nav>
  );
};

export default ProfileTabs;
