import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import UserProfileInfo from "@/components/UserProfileInfo/UserProfileInfo";
import ProfileTabs from "./_components/ProfileTabs";
import css from "./Profile.module.css";

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

const previewProfile = {
  name: "Naomi",
  avatarUrl: "/images/creators/naomi.jpg",
  articlesCount: 96,
};

const ProfileLayout = ({ children, articles }: ProfileLayoutProps) => {
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.content}>
          <div className={css.title}>
            <SectionTitle>My Profile</SectionTitle>
          </div>

          <div className={css.profileInfo}>
            <UserProfileInfo {...previewProfile} />
          </div>

          <ProfileTabs />
          {children}
          {articles}
        </div>
      </div>
    </section>
  );
};

export default ProfileLayout;
