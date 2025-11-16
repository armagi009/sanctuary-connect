import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Article } from '@shared/types';
import { MOCK_ARTICLES } from '@/data/mockData';
import { useAuthStore } from './authStore';
export type NewArticle = Omit<Article, 'id' | 'publishedDate' | 'authorName' | 'authorImageUrl'>;
interface CommunityState {
  articles: Article[];
  addArticle: (article: NewArticle) => void;
  updateArticle: (articleId: string, updatedData: NewArticle) => void;
  deleteArticle: (articleId: string) => void;
}
export const useCommunityStore = create<CommunityState>()(
  persist(
    (set) => ({
      articles: MOCK_ARTICLES,
      addArticle: (newArticle) => {
        const user = useAuthStore.getState().user;
        const authorName = user?.name || 'A Practitioner';
        const authorImageUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${authorName}`;
        set((state) => ({
          articles: [
            ...state.articles,
            {
              ...newArticle,
              id: crypto.randomUUID(),
              publishedDate: new Date().toISOString(),
              authorName,
              authorImageUrl,
            },
          ],
        }));
      },
      updateArticle: (articleId, updatedData) => {
        set((state) => ({
          articles: state.articles.map((article) =>
            article.id === articleId
              ? { ...article, ...updatedData, publishedDate: new Date().toISOString() } // Update publish date on edit
              : article
          ),
        }));
      },
      deleteArticle: (articleId) => {
        set((state) => ({
          articles: state.articles.filter((article) => article.id !== articleId),
        }));
      },
    }),
    {
      name: 'community-storage',
    }
  )
);