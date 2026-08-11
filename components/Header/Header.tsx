import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.headerContainer}>
      <div className={`container`}>
        <div>
          <svg
            className={css.logo}
            width="106"
            height="25"
            viewBox="0 0 136 32"
          >
            <use className={css.logoIcon} href="/sprite.svg#icon-logo" />
          </svg>
        </div>
      </div>
    </header>
  );
};
export default Header;
