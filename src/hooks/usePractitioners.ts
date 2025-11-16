import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Practitioner } from '@shared/types';
interface PractitionerListResponse {
  items: Practitioner[];
  next: string | null;
}
const fetchPractitioners = async (): Promise<Practitioner[]> => {
  const response = await api<PractitionerListResponse>('/api/practitioners');
  return response.items;
};
export function usePractitioners() {
  return useQuery<Practitioner[], Error>({
    queryKey: ['practitioners'],
    queryFn: fetchPractitioners,
  });
}