import type { Metadata } from 'next';
import UploadForm from '../../components/UploadForm/UploadForm';

export const metadata: Metadata = {
  title: 'Upload Photo | Harmoniq',
  description: 'Upload your profile photo to complete your Harmoniq profile.',
  openGraph: {
    title: 'Upload Photo | Harmoniq',
    description: 'Upload your profile photo to complete your Harmoniq profile.',
    type: 'website',
  },
};

const UploadPhoto = () => {
  return (
    <section>
      <div className="container">
        <UploadForm />
      </div>
    </section>
  );
};

export default UploadPhoto;