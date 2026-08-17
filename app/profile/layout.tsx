import type { Metadata } from "next";
import ProfileShell from "./_components/ProfileShell";

export const metadata: Metadata = {
  title: "My Profile | Harmoniq",
  description: "View your Harmoniq profile and manage your articles.",
  openGraph: {
    title: "My Profile | Harmoniq",
    description: "View your Harmoniq profile and manage your articles.",
  },
};

interface ProfileLayoutProps {
  children: React.ReactNode;
  articles: React.ReactNode;
}

const ProfileLayout = ({ children, articles }: ProfileLayoutProps) => {
  return <ProfileShell articles={articles}>{children}</ProfileShell>;
};

export default ProfileLayout;
