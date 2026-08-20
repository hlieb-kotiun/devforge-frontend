import Image from "next/image";
import Link from "next/link";
import { Author } from "@/types/author";
import { getAvatarUrl } from "@/lib/utils/avatar";
import styles from "./AuthorsItem.module.css";

type AuthorsItemProps = {
  author: Author;
  ref?: React.Ref<HTMLLIElement>;
};

const AuthorsItem = ({ author, ref }: AuthorsItemProps) => {
  const displayName = author.name || author.username || "Unknown";
  const name = displayName.split(" ")[0];
  const avatarSrc = getAvatarUrl(author.avatarUrl);

  return (
    <li className={styles.item} ref={ref}>
      <Link href={`/authors/${author._id}`} className={styles.link}>
        <Image
          src={avatarSrc}
          alt={displayName}
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