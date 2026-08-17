"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import UserProfileInfo from "@/components/UserProfileInfo/UserProfileInfo";
import { Loader } from "@/components/Loader/Loader";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { isUnauthorizedError } from "@/lib/api/apiError";
import ProfileTabs from "./ProfileTabs";
import css from "../Profile.module.css";

const FALLBACK_AVATAR = "/images/test-avatar.png";

interface ProfileShellProps {
  children: React.ReactNode;
  articles: React.ReactNode;
}

const ProfileShell = ({ children, articles }: ProfileShellProps) => {
  const router = useRouter();
  const { data: user, isPending, error } = useCurrentUser();

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
                  avatarUrl={user.avatarUrl || user.avatar || FALLBACK_AVATAR}
                  articlesCount={user.articlesAmount}
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

export default ProfileShell;
