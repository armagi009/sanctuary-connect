import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NewReview } from '@/stores/reviewStore';
interface ReviewFormProps {
  practitionerName: string;
  sessionTitle: string;
  practitionerId: string;
  onSubmit: (review: NewReview) => void;
}
export function ReviewForm({ practitionerName, sessionTitle, practitionerId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [presence, setPresence] = useState('');
  const [insight, setInsight] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit({
        practitionerId,
        rating,
        presence,
        insight,
        recommendation,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">You are reviewing your session:</p>
        <p className="font-semibold">{sessionTitle} with {practitionerName}</p>
      </div>
      <div className="space-y-2">
        <Label>Overall Rating</Label>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
              <button
                type="button"
                key={starValue}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={cn(
                    'w-7 h-7 cursor-pointer transition-colors',
                    starValue <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-muted-foreground/30'
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="presence">What was the quality of presence your practitioner held?</Label>
        <Textarea
          id="presence"
          value={presence}
          onChange={(e) => setPresence(e.target.value)}
          placeholder="e.g., They held a warm, non-judgmental space..."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="insight">What insight did you gain from this session?</Label>
        <Textarea
          id="insight"
          value={insight}
          onChange={(e) => setInsight(e.target.value)}
          placeholder="e.g., I gained a profound understanding of..."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="recommendation">Would you recommend this practitioner?</Label>
        <Textarea
          id="recommendation"
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
          placeholder="e.g., I would wholeheartedly recommend them to anyone..."
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={rating === 0}>
        Submit Review
      </Button>
    </form>
  );
}