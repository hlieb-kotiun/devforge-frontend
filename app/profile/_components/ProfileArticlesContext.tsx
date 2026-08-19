"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProfileArticlesContextType {
  savedArticlesCount: number | null;
  setSavedArticlesCount: (count: number) => void;
  createdArticlesCount: number | null;
  setCreatedArticlesCount: (count: number) => void;
}

const ProfileArticlesContext = createContext<ProfileArticlesContextType>({
  savedArticlesCount: null,
  setSavedArticlesCount: () => {},
  createdArticlesCount: null,
  setCreatedArticlesCount: () => {},
});

export const ProfileArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [savedArticlesCount, setSavedArticlesCount] = useState<number | null>(null);
  const [createdArticlesCount, setCreatedArticlesCount] = useState<number | null>(null);

  return (
    <ProfileArticlesContext.Provider
      value={{
        savedArticlesCount,
        setSavedArticlesCount,
        createdArticlesCount,
        setCreatedArticlesCount,
      }}
    >
      {children}
    </ProfileArticlesContext.Provider>
  );
};

export const useProfileArticles = () => useContext(ProfileArticlesContext);