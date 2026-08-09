import Image from "next/image";
import Link from "next/link";
import { Author } from "@/types/author";
import styles from "./AuthorsItem.module.css";

type AuthorsItemProps = {
  author: Author;
  ref?: React.Ref<HTMLLIElement>;
};

const AuthorsItem = ({ author, ref }: AuthorsItemProps) => {
  return (
    <li className={styles.item} ref={ref}>
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