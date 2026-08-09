import Image from "next/image";
import Link from "next/link";
import { Author } from "@/types/author";
import styles from "./AuthorsItem.module.css";

type AuthorsItemProps = {
  author: Author;
};

const AuthorsItem = ({ author }: AuthorsItemProps) => {
  return (
    <li className={styles.item}>
      <Link href={`/authors/${author._id}`} className={styles.link}>
        <Image
          src={author.avatarUrl}
          alt={author.name}
          width={80}
          height={80}
          className={styles.avatar}
        />
        <p className={styles.name}>{author.name}</p>
      </Link>
    </li>
  );
};

export default AuthorsItem;