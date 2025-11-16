import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ShieldCheck, MapPin, Clock, Target, Lightbulb } from 'lucide-react';
import { MOCK_PRACTITIONERS, MOCK_SESSIONS } from '@/data/mockData';
import { ReviewCard } from '@/components/ReviewCard';
import { useReviewStore } from '@/stores/reviewStore';
export function ProfilePage() {
  const { id } = useParams();
  const practitioner = MOCK_PRACTITIONERS.find(p => p.id === id);
  const allReviews = useReviewStore((state) => state.reviews);
  const reviews = allReviews.filter(r => r.practitionerId === id);
  if (!practitioner) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold">Practitioner not found</h1>
          <p className="text-muted-foreground mt-2">The practitioner you are looking for does not exist.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column (Image & Booking) */}
            <div className="md:col-span-1 space-y-6">
              <Card className="overflow-hidden sticky top-24">
                <div className="aspect-[1/1]">
                  <img src={practitioner.imageUrl} alt={practitioner.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6 text-center">
                  <h1 className="text-2xl font-bold">{practitioner.name}</h1>
                  <p className="text-muted-foreground mt-1">{practitioner.tagline}</p>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{practitioner.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({practitioner.reviewCount + reviews.length})</span>
                  </div>
                  <Button asChild size="lg" className="w-full mt-6">
                    <Link to={`/book/${practitioner.id}`} state={{ session: MOCK_SESSIONS[1] }}>Book a Session</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            {/* Right Column (Details) */}
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>My Philosophy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{practitioner.philosophy}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>How I Can Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">I specialize in helping...</h4>
                      <p className="text-sm text-muted-foreground">{practitioner.specialty.focus}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">My unique approach is...</h4>
                      <p className="text-sm text-muted-foreground">{practitioner.specialty.approach}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Modalities</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {practitioner.modalities.map(modality => (
                    <Badge key={modality} variant="outline" className="text-base py-1 px-3">{modality}</Badge>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {practitioner.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{cert.title}</p>
                          <p className="text-sm text-muted-foreground">{cert.institution} &bull; {cert.year}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Session Offerings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {MOCK_SESSIONS.map((session, index) => (
                        <div key={index} className="flex justify-between items-start p-4 border rounded-lg bg-background">
                            <div>
                                <h4 className="font-semibold">{session.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {session.duration} min</span>
                                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Online</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">${session.price}</p>
                                <Button asChild size="sm" className="mt-1">
                                    <Link to={`/book/${practitioner.id}`} state={{ session }}>Book Now</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Reviews & Testimonials ({reviews.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map(review => <ReviewCard key={review.id} review={review} />)
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No reviews yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}