import Image from "next/image";
import Link from "next/link";
import { Author } from "@/types/author";
import styles from "./AuthorsItem.module.css";

type AuthorsItemProps = {
  author: Author;
  ref?: React.Ref<HTMLLIElement>;
};

const FALLBACK_AVATAR = "/images/default-avatar.png";

const AuthorsItem = ({ author, ref }: AuthorsItemProps) => {
  const name = author.name?.split(" ")[0] ?? "Unknown";
  const avatarSrc = author.avatarUrl?.trim() ? author.avatarUrl : FALLBACK_AVATAR;

  return (
    <li className={styles.item} ref={ref}>
      <Link href={`/authors/${author._id}`} className={styles.link}>
        <Image
          src={avatarSrc}
          alt={author.name ?? "Author avatar"}
          width={262}
          height={262}
          className={styles.avatar}
          unoptimized
        />
        <p className={styles.name}>{name}</p>
      </Link>
    </li>
  );
};

export default AuthorsItem;