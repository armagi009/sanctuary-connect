import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Article } from '@shared/types';
interface ArticleListResponse {
  items: Article[];
  next: string | null;
}
const fetchArticles = async (): Promise<Article[]> => {
  const response = await api<ArticleListResponse>('/api/articles');
  return response.items;
};
export function useArticles() {
  return useQuery<Article[], Error>({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });
}