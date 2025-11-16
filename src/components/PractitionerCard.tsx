import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import type { Practitioner } from '@shared/types';
interface PractitionerCardProps {
  practitioner: Practitioner;
}
export function PractitionerCard({ practitioner }: PractitionerCardProps) {
  return (
    <Link to={`/practitioners/${practitioner.id}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={practitioner.imageUrl}
            alt={practitioner.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-foreground">{practitioner.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{practitioner.tagline}</p>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span>{practitioner.location}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {practitioner.modalities.slice(0, 3).map((modality) => (
              <Badge key={modality} variant="secondary">{modality}</Badge>
            ))}
            {practitioner.modalities.length > 3 && (
              <Badge variant="secondary">+{practitioner.modalities.length - 3}</Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-foreground">{practitioner.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({practitioner.reviewCount})</span>
          </div>
          <span className="text-sm font-semibold text-primary group-hover:underline">View Profile</span>
        </CardFooter>
      </Card>
    </Link>
  );
}