import css from "./LoadMoreButton.module.css";

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

const LoadMoreButton = ({ onClick, isLoading = false }: LoadMoreButtonProps) => {
  return (
    <button
      type="button"
      className={css.button}
      onClick={onClick}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? "Loading..." : "Load More"}
    </button>
  );
};

export default LoadMoreButton;
