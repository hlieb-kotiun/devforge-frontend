import Image from "next/image";
import css from "./UserProfileInfo.module.css";

interface UserProfileInfoProps {
  name: string;
  avatarUrl: string;
  articlesCount: number;
}

const UserProfileInfo = ({
  name,
  avatarUrl,
  articlesCount,
}: UserProfileInfoProps) => {
  return (
    <div className={css.profileInfo}>
      <Image
        src={avatarUrl}
        alt={`${name}'s profile picture`}
        width={137}
        height={137}
        className={css.avatar}
        loading="eager"
        unoptimized
      />

      <div className={css.details}>
        <p className={css.name}>{name}</p>
        <p className={css.count}>
          {articlesCount} {articlesCount === 1 ? "article" : "articles"}
        </p>
      </div>
    </div>
  );
};

export default UserProfileInfo;
