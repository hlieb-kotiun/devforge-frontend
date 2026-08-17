import Link from "next/link";
import css from "./ArticlesEmptyState.module.css";

interface ArticlesEmptyStateProps {
  description: string;
  linkHref: string;
  linkLabel: string;
}

const ArticlesEmptyState = ({
  description,
  linkHref,
  linkLabel,
}: ArticlesEmptyStateProps) => {
  return (
    <div className={css.emptyState}>
      <span className={css.icon} aria-hidden="true">
        !
      </span>

      <div className={css.message}>
        <h2 className={css.title}>Nothing found.</h2>
        <p className={css.description}>{description}</p>
      </div>

      <Link href={linkHref} className={css.link}>
        {linkLabel}
      </Link>
    </div>
  );
};

export default ArticlesEmptyState;
