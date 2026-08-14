import css from "./SectionTitle.module.css";

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  return <h1 className={css.title}>{children}</h1>;
};

export default SectionTitle;
