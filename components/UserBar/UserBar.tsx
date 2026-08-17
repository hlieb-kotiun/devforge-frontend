import Image from "next/image";
import { AVATAR_PLACEHOLDER } from "@/lib/utils/avatar";
import css from "./UserBar.module.css";

type UserBarProps = {
  name: string;
  avatar: string;
  onLogout: () => void;
};

const UserBar = ({ name, avatar, onLogout }: UserBarProps) => {
  return (
    <div className={css.loggedInUserContainer}>
      <div className={css.loggedInUserAvatarContainer}>
        <Image
          className={css.loggedInUserAvatar}
          src={avatar}
          alt={`${name}'s avatar`}
          width={32}
          height={32}
          unoptimized={avatar === AVATAR_PLACEHOLDER}
        />
        <p className={css.loggedInUserName}>{name}</p>
      </div>

      <button className={css.logoutBtn} type="button" onClick={onLogout} aria-label="Log out">
        <svg className={css.logoutIcon} width="16" height="15" aria-hidden="true">
          <use href="/sprite.svg#icon-logout" />
        </svg>
      </button>
    </div>
  );
};

export default UserBar;
