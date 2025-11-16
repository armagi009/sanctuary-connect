import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Article } from '@shared/types';
import { MOCK_ARTICLES } from '@/data/mockData';
import { useAuthStore } from './authStore';
export type NewArticle = Omit<Article, 'id' | 'publishedDate' | 'authorName' | 'authorImageUrl'>;
interface CommunityState {
  articles: Article[];
  addArticle: (article: NewArticle) => void;
}
export const useCommunityStore = create<CommunityState>()(
  persist(
    (set) => ({
      articles: MOCK_ARTICLES,
      addArticle: (newArticle) => {
        const user = useAuthStore.getState().user;
        // In a real app, author info would come from the logged-in practitioner's profile
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
    }),
    {
      name: 'community-storage',
    }
  )
);