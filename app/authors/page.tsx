import AuthorsList from "@/components/AuthorsList/AuthorsList";

const AuthorsPage = () => {
  return (
    <section className="">
      <div className={`container`}>
        {/* Test h1 tag, must be deleted */}
        <h1>Authors</h1>{" "}
        <AuthorsList />
      </div>
    </section>
  );
};
export default AuthorsPage;
