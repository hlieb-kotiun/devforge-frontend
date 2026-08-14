import ArticleForm from "@/components/ArticleForm/ArticleForm";

const CreateArticlePage = () => {
  return (
    <section className="">
      <div className={`container`}>     
        <h1>Create an article</h1>{" "}
        <ArticleForm/>
      </div>
    </section>
  );
};
export default CreateArticlePage;
