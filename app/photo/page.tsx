import type { Metadata } from 'next';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto';

export const metadata: Metadata = {
  title: 'Upload Photo | Harmoniq',
  description: 'Upload your profile photo to complete your Harmoniq profile.',
  openGraph: {
    title: 'Upload Photo | Harmoniq',
    description: 'Upload your profile photo to complete your Harmoniq profile.',
    type: 'website',
  },
};

export default function UploadPhotoPage() {
  return <UploadPhoto />;
}