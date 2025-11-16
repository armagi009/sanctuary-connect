import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';
import type { Practitioner } from '@shared/types';
const MOCK_PRACTITIONERS: Practitioner[] = [
    { id: '1', name: 'Dr. Althea Sol', imageUrl: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop`, tagline: 'Guiding you to inner peace through mindfulness.', philosophy: 'I believe in a holistic approach to healing, integrating mind, body, and spirit to foster deep, lasting transformation. My work is grounded in compassion, presence, and the belief that everyone holds the innate capacity to heal.', modalities: ['Mindfulness', 'Somatic Healing', 'Reiki', 'Meditation'], certifications: [{ institution: 'Mindful Institute', title: 'Certified Mindfulness Teacher', year: 2018 }, { institution: 'Somatic Experiencing Trauma Institute', title: 'Somatic Healing Practitioner', year: 2020 }], rating: 4.9, reviewCount: 124, location: 'San Francisco, CA' },
    { id: '2', name: 'Marcus Thorne', imageUrl: `https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop`, tagline: 'Unlock your potential with shamanic wisdom.', philosophy: 'My practice is rooted in ancient shamanic traditions, helping you connect with your spirit guides and heal ancestral patterns. I serve as a bridge between worlds to bring back wisdom and healing for your soul\'s journey.', modalities: ['Shamanic Journeying', 'Ancestral Healing', 'Tarot', 'Soul Retrieval'], certifications: [{ institution: 'The Shamanic Path', title: 'Master Shamanic Practitioner', year: 2015 }], rating: 5.0, reviewCount: 98, location: 'Asheville, NC' },
    { id: '3', name: 'Lena Petrova', imageUrl: `https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop`, tagline: 'Somatic healing for embodied wellness.', philosophy: 'Through gentle, body-based practices, we can release trauma and cultivate a profound sense of safety and presence. Healing happens when we learn to listen to the wisdom of the body.', modalities: ['Somatic Healing', 'Yoga Therapy', 'Breathwork'], certifications: [{ institution: 'Embodied Wellness Institute', title: 'Certified Somatic Therapist', year: 2020 }], rating: 4.8, reviewCount: 76, location: 'Online' },
];
export function ProfilePage() {
  const { id } = useParams();
  const practitioner = MOCK_PRACTITIONERS.find(p => p.id === id);
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
                    <span className="text-muted-foreground">({practitioner.reviewCount} reviews)</span>
                  </div>
                  <Button size="lg" className="w-full mt-6">Book a Session</Button>
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
                    <div className="flex justify-between items-start p-4 border rounded-lg">
                        <div>
                            <h4 className="font-semibold">Introductory Consultation</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 30 min</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Online</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg">$75</p>
                            <Button size="sm" className="mt-1">Book Now</Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-start p-4 border rounded-lg">
                        <div>
                            <h4 className="font-semibold">Standard Healing Session</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 60 min</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Online</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg">$150</p>
                            <Button size="sm" className="mt-1">Book Now</Button>
                        </div>
                    </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}