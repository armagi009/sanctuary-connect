import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { Review } from '@shared/types';
import { format, parseISO } from 'date-fns';
interface ReviewCardProps {
  review: Review;
}
export function ReviewCard({ review }: ReviewCardProps) {
  const reviewerInitials = review.reviewerName.split(' ').map(n => n[0]).join('');
  return (
    <Card className="bg-background">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-11 w-11">
            <AvatarImage src={review.reviewerImageUrl} alt={review.reviewerName} />
            <AvatarFallback>{reviewerInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-foreground">{review.reviewerName}</p>
                <p className="text-xs text-muted-foreground">{format(parseISO(review.reviewDate), 'MMMM d, yyyy')}</p>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/50'}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 space-y-4 text-sm text-foreground/90">
              <div>
                <p className="font-medium text-foreground">What was the quality of presence your practitioner held?</p>
                <p className="text-muted-foreground mt-1 italic">"{review.presence}"</p>
              </div>
              <div>
                <p className="font-medium text-foreground">What insight did you gain from this session?</p>
                <p className="text-muted-foreground mt-1 italic">"{review.insight}"</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Would you recommend this practitioner?</p>
                <p className="text-muted-foreground mt-1 italic">"{review.recommendation}"</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}