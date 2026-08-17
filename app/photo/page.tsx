import type { Metadata } from "next";
import UploadForm from "../../components/UploadForm/UploadForm";
import css from "./UploadPhoto.module.css";

export const metadata: Metadata = {
  title: "Upload Photo | Harmoniq",
  description: "Upload your profile photo to complete your Harmoniq profile.",
  openGraph: {
    title: "Upload Photo | Harmoniq",
    description: "Upload your profile photo to complete your Harmoniq profile.",
    type: "website",
  },
};

const UploadPhoto = () => {
  return (
    <section className={css.page}>
      <div className={`container ${css.content}`}>
        <UploadForm />
      </div>
    </section>
  );
};

export default UploadPhoto;
