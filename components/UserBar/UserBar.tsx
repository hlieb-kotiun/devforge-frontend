"use client";
import css from "./UserBar.module.css";
import Image from "next/image";

const UserBar = () => {
  return (
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
  );
};

export default UserBar;
