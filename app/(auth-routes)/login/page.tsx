import css from "@/app/(auth-routes)/login/LoginPage.module.css";
import LoginForm from "@/components/LoginForm/LoginForm";
const LoginPage = () => {
  return (
    <section className={css.loginSection}>
      <div className={`container`}>
        <LoginForm />
      </div>
    </section>
  );
};
export default LoginPage;
