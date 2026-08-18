// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { type Article, type ArticleOwner } from "@/types/article";
// import css from "./ButtonAddToBookmarks2.module.css";
// import { useAuthStore } from "@/lib/store/authStore";
// import ModalErrorSave from "../ModalErrorSave/ModalErrorSave";

// interface ArticleItemProps {
//   article: Article;
// }
// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL ||
//   "https://devforge-backend-l7uv.onrender.com";

// const ButtonAddToBookmarks = ({ article }: ArticleItemProps) => {
//   const router = useRouter();

//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   const user = useAuthStore((state) => state.user);
//   const setUser = useAuthStore((state) => state.setUser);

//   // const [isDeleting, setIsDeleting] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

//   const ownerId =
//     typeof article.ownerId === "string" ? article.ownerId : article.ownerId._id;

//   const isOwner = isAuthenticated && Boolean(user?._id && user._id === ownerId);

//   const isSaved = Boolean(user?.savedArticles?.includes(article._id));

//   const handleToggleSave = async () => {
//     if (isSaving) return;
//     if (!isAuthenticated) {
//       setIsErrorModalOpen(true);
//       // router.push("/login");
//       return;
//     }

//     setIsSaving(true);
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/saved-articles/${article._id}`,
//         {
//           method: isSaved ? "DELETE" : "POST",
//         },
//       );

//       if (!response.ok) throw new Error("Помилка збереження");
//       const updateUser = await response.json();

//       setUser(updateUser);
//     } catch (error) {
//       console.error("Помилка при збереженні статті:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // const handleDelete = async () => {
//   //   const isConfirmed = window.confirm("Ви дійсно хочете видалити цю статтю?");
//   //   if (!isConfirmed || isDeleting) return;

//   //   setIsDeleting(true);
//   //   try {
//   //     const response = await fetch(`${API_BASE_URL}/articles/${article._id}`, {
//   //       method: "DELETE",
//   //     });

//   //     if (!response.ok) throw new Error("Не вдалося видалити статтю");

//   //     router.refresh();
//   //   } catch (error) {
//   //     console.error("Помилка при видаленні:", error);
//   //   } finally {
//   //     setIsDeleting(false);
//   //   }
//   // };

//   // Перехід на сторінку редагування
//   const handleEdit = () => {
//     router.push(`/articles/${article._id}/edit`);
//   };
//   return (
//     <>
//       <div className={css.root}>
//         {/* Кнопка "Зберегти"  */}
//         {isOwner ? (
//           <>
//             <button
//               onClick={handleEdit}
//               className={`${css.card__btn} ${css.card__btn_icon}`}
//               aria-label="Edit article"
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1"
//                 aria-hidden="true"
//               >
//                 <use href="/sprite.svg#icon-edit" />
//               </svg>
//             </button>

//             {/* { <button
//             onClick={handleDelete}
//             disabled={isDeleting}
//             className={`${css.card__btn} ${css.card__btn_icon}`}
//             aria-label="Delete article"
//           >
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1"
//             >
//               <use href="/sprite.svg#Generic=delete,%20Size=32px" />
//             </svg>
//           </button>} */}
//           </>
//         ) : (
//           <button
//             onClick={handleToggleSave}
//             disabled={isSaving}
//             className={`${css.card__btn} ${css.card__btn_icon} ${isSaved ? css.saved : ""}`}
//             aria-label={isSaved ? "Remove from saved" : "Save article"}
//           >
//             <svg
//               className={css.bookmarkIcon}
//               width="24"
//               height="24"
//               viewBox="0 0 32 32"
//               aria-hidden="true"
//             >
//               <use href="/sprite.svg#Generic=bookmark-alternative,%20Size=32px" />
//             </svg>
//           </button>
//         )}
//       </div>
//       {isErrorModalOpen && (
//         <ModalErrorSave onClose={() => setIsErrorModalOpen(false)} />
//       )}
//     </>
//   );
// };

// export default ButtonAddToBookmarks;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Article } from "@/types/article";
import css from "./ButtonAddToBookmarks2.module.css";
import ModalErrorSave from "../ModalErrorSave/ModalErrorSave";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import {
  addArticleToSavedArticles,
  removeArticleFromSavedArticles,
} from "@/lib/api/bookmarkApi";

interface ArticleItemProps {
  article: Article;
}

const ButtonAddToBookmarks2 = ({ article }: ArticleItemProps) => {
  const router = useRouter();
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const isAuthenticated = !!currentUser;

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const ownerId =
    typeof article.ownerId === "string" ? article.ownerId : article.ownerId._id;

  const isOwner =
    isAuthenticated && Boolean(currentUser?._id && currentUser._id === ownerId);

  const handleToggleSave = async () => {
    if (isSaving || isUserLoading) return;

    if (!isAuthenticated) {
      setIsErrorModalOpen(true);
      return;
    }

    setIsSaving(true);
    try {
      if (isSaved) {
        await removeArticleFromSavedArticles(article._id);
        setIsSaved(false);
      } else {
        await addArticleToSavedArticles(article._id);
        setIsSaved(true);
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("log in")) {
        setIsErrorModalOpen(true);
        return;
      }
      toast.error(
        error instanceof Error ? error.message : "Failed to save article",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    router.push(`/articles/${article._id}/edit`);
  };

  return (
    <>
      <div className={css.root}>
        {isOwner ? (
          <button
            onClick={handleEdit}
            className={`${css.card__btn} ${css.card__btn_icon}`}
            aria-label="Edit article"
          >
            <svg
                 width="24"
                height="24"
                viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
                strokeWidth="1"
                 aria-hidden="true"
               >
                 <use href="/sprite.svg#icon-edit" />
             </svg>
          </button>
        ) : (
          <button
            onClick={handleToggleSave}
            disabled={isSaving || isUserLoading}
            className={`${css.card__btn} ${css.card__btn_icon} ${isSaved ? css.saved : ""}`}
            aria-label={isSaved ? "Remove from saved" : "Save article"}
          >
             <svg
               className={css.bookmarkIcon}
               width="24"
               height="24"
               viewBox="0 0 32 32"
               aria-hidden="true"
             >
               <use href="/sprite.svg#Generic=bookmark-alternative,%20Size=32px" />
             </svg>
          </button>
        )}
      </div>

      {isErrorModalOpen && (
        <ModalErrorSave onClose={() => setIsErrorModalOpen(false)} />
      )}
    </>
  );
};

export default ButtonAddToBookmarks2;
