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

interface UploadPhotoProps {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
}

const UploadPhoto = async ({ searchParams }: UploadPhotoProps) => {
  const { returnTo } = await searchParams;
  const redirectTo = returnTo === "/profile" ? "/profile" : "/articles";

  return (
    <section className={css.page}>
      <div className={`container ${css.content}`}>
        <UploadForm redirectTo={redirectTo} />
      </div>
    </section>
  );
};

export default UploadPhoto;
