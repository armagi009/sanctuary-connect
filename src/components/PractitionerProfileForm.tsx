import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MOCK_PRACTITIONERS } from '@/data/mockData';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// For demo purposes, we'll assume the logged-in user is the first practitioner.
const currentPractitioner = MOCK_PRACTITIONERS[0];
export function PractitionerProfileForm() {
  const [profile, setProfile] = useState({
    name: currentPractitioner.name,
    tagline: currentPractitioner.tagline,
    philosophy: currentPractitioner.philosophy,
    modalities: currentPractitioner.modalities.join(', '),
    location: currentPractitioner.location,
    specialtyFocus: currentPractitioner.specialty.focus,
    specialtyApproach: currentPractitioner.specialty.approach,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call.
    console.log('Saving profile:', profile);
    toast.success('Profile updated successfully!', {
      description: 'Your changes have been saved and are now live.',
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Your Public Profile</CardTitle>
          <CardDescription>This is how seekers will see you on the platform. Keep it up to date.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={profile.location} onChange={handleInputChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" name="tagline" value={profile.tagline} onChange={handleInputChange} placeholder="e.g., Guiding you to inner peace through mindfulness." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="philosophy">My Philosophy</Label>
            <Textarea id="philosophy" name="philosophy" value={profile.philosophy} onChange={handleInputChange} rows={5} placeholder="Share your approach to healing..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialtyFocus">How I Can Help: My Specialty</Label>
            <Textarea id="specialtyFocus" name="specialtyFocus" value={profile.specialtyFocus} onChange={handleInputChange} rows={3} placeholder="I specialize in helping people who..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialtyApproach">How I Can Help: My Approach</Label>
            <Textarea id="specialtyApproach" name="specialtyApproach" value={profile.specialtyApproach} onChange={handleInputChange} rows={3} placeholder="My unique approach is..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modalities">Modalities</Label>
            <Textarea id="modalities" name="modalities" value={profile.modalities} onChange={handleInputChange} placeholder="e.g., Mindfulness, Somatic Healing, Reiki" />
            <p className="text-sm text-muted-foreground">Separate modalities with a comma.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </Card>
    </form>
  );
}