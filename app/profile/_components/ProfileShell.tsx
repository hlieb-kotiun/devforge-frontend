"use client";

import { useEffect } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import toast from "react-hot-toast";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import UserProfileInfo from "@/components/UserProfileInfo/UserProfileInfo";
import { Loader } from "@/components/Loader/Loader";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { isUnauthorizedError } from "@/lib/api/apiError";
import { getAvatarUrl } from "@/lib/utils/avatar";
import ProfileTabs from "./ProfileTabs";
import { ProfileArticlesProvider, useProfileArticles } from "./ProfileArticlesContext";
import css from "../Profile.module.css";

interface ProfileShellProps {
  children: React.ReactNode;
  articles: React.ReactNode;
}

const ProfileContent = ({ children, articles }: ProfileShellProps) => {
  const router = useRouter();
  const { data: user, isPending, error } = useCurrentUser();
  const activeSegment = useSelectedLayoutSegment("articles");
  const isSavedActive = activeSegment === "saved";

  const { savedArticlesCount, createdArticlesCount } = useProfileArticles();

  const isUnauthorized = isUnauthorizedError(error);

  useEffect(() => {
    if (isUnauthorized) {
      router.replace("/login");
    }
  }, [isUnauthorized, router]);

  useEffect(() => {
    if (error && !isUnauthorized) {
      toast.error(error.message);
    }
  }, [error, isUnauthorized]);

  // Під час редіректу теж тримаємо лоадер, щоб не блимнути порожнім профілем.
  if (isPending || isUnauthorized) {
    return <Loader label="Loading profile" />;
  }

  const displayArticlesCount = isSavedActive
    ? (savedArticlesCount ?? 0)
    : (createdArticlesCount ?? user?.articlesAmount ?? 0);

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.content}>
          <div className={css.title}>
            <SectionTitle>My Profile</SectionTitle>
          </div>

          {user ? (
            <>
              <div className={css.profileInfo}>
                <UserProfileInfo
                  name={user.name || user.username || "User"}
                  avatarUrl={getAvatarUrl(user.avatarUrl, user.avatar)}
                  articlesCount={displayArticlesCount}
                  avatarHref="/photo?returnTo=/profile"
                />
              </div>

              <ProfileTabs />
              {children}
              {articles}
            </>
          ) : (
            <p className={css.error} role="status">
              {error?.message ?? "Failed to load your profile."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const ProfileShell = (props: ProfileShellProps) => {
  return (
    <ProfileArticlesProvider>
      <ProfileContent {...props} />
    </ProfileArticlesProvider>
  );
};

export default ProfileShell;
