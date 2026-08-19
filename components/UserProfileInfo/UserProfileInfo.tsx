import Image from "next/image";
import Link from "next/link";
import css from "./UserProfileInfo.module.css";

interface UserProfileInfoProps {
  name: string;
  avatarUrl: string;
  articlesCount: number;
  avatarHref?: string;
}

const UserProfileInfo = ({
  name,
  avatarUrl,
  articlesCount,
  avatarHref,
}: UserProfileInfoProps) => {
  const avatar = (
    <Image
      src={avatarUrl}
      alt={`${name}'s profile picture`}
      width={137}
      height={137}
      className={css.avatar}
      loading="eager"
      unoptimized
    />
  );

  return (
    <div className={css.profileInfo}>
      {avatarHref ? (
        <Link
          href={avatarHref}
          className={css.avatarLink}
          aria-label="Change profile photo"
        >
          {avatar}
        </Link>
      ) : (
        avatar
      )}

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
