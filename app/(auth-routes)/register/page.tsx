import RegisterForm from "@/components/RegisterForm/RegisterForm";
import css from "@/app/(auth-routes)/register/RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <section className={css.register_section}>
      <div>
        <RegisterForm />
      </div>
    </section>
  );
};
export default RegisterPage;
