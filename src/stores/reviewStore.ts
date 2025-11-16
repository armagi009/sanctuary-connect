import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Review } from '@shared/types';
// Initial mock data for reviews, moved from mockData.ts
const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    practitionerId: '1',
    reviewerName: 'Sarah K.',
    reviewerImageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    reviewDate: '2024-05-20T10:00:00Z',
    presence: 'Althea holds such a warm and non-judgmental space. I felt completely seen and heard.',
    insight: 'I gained a profound understanding of my own thought patterns and how to approach them with kindness.',
    recommendation: 'I would wholeheartedly recommend Dr. Sol to anyone seeking to cultivate a deeper sense of peace and self-awareness.'
  },
  {
    id: 'r2',
    practitionerId: '1',
    reviewerName: 'James L.',
    reviewerImageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    reviewDate: '2024-04-15T14:30:00Z',
    presence: 'Her presence is incredibly calming. It felt like a true sanctuary from the chaos of daily life.',
    insight: 'The somatic exercises we did were transformative. I connected with my body in a way I never have before.',
    recommendation: 'If you are looking for a guide to help you reconnect with your body and spirit, look no further.'
  },
  {
    id: 'r3',
    practitionerId: '2',
    reviewerName: 'Chloe T.',
    reviewerImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    reviewDate: '2024-06-01T11:00:00Z',
    presence: 'Marcus is a powerful and grounded guide. I felt safe to explore deep spiritual questions with him.',
    insight: 'The shamanic journey was unlike anything I\'ve experienced. The clarity and messages I received were life-changing.',
    recommendation: 'For anyone curious about shamanism or seeking deep spiritual guidance, Marcus is an authentic and gifted practitioner.'
  }
];
export type NewReview = Omit<Review, 'id' | 'reviewDate' | 'reviewerName' | 'reviewerImageUrl'>;
interface ReviewState {
  reviews: Review[];
  addReview: (review: NewReview, reviewer: { name: string; imageUrl: string }) => void;
}
export const useReviewStore = create<ReviewState>()(
  persist(
    (set) => ({
      reviews: INITIAL_REVIEWS,
      addReview: (newReview, reviewer) =>
        set((state) => ({
          reviews: [
            ...state.reviews,
            {
              ...newReview,
              id: crypto.randomUUID(),
              reviewDate: new Date().toISOString(),
              reviewerName: reviewer.name,
              reviewerImageUrl: reviewer.imageUrl,
            },
          ],
        })),
    }),
    {
      name: 'review-storage',
    }
  )
);