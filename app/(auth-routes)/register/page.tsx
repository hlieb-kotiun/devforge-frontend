import RegisterForm from "@/components/RegisterForm/RegisterForm";
import css from "@/app/(auth-routes)/register/RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <section className="">
      <div className={`container`}>
        {/* Test h1 tag, must be deleted */}{" "}
        <h1 className={css.title}> RegisterPage </h1>
        <RegisterForm />
      </div>
    </section>
  );
};
export default RegisterPage;
