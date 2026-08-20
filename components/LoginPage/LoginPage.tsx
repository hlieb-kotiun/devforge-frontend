import LoginForm from "@/components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <section className={css.loginSection}>
      <div className="container">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;