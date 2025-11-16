import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Feather } from 'lucide-react';
import { toast } from 'sonner';
const steps = [
  { id: 1, title: 'Personal Information' },
  { id: 2, title: 'Your Practice' },
  { id: 3, title: 'Credentials' },
];
export function PractitionerApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    philosophy: '',
    modalities: '',
    certifications: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting application:', formData);
    toast.success('Application Submitted!', {
      description: 'Thank you for your interest. We will review your application and be in touch soon.',
    });
    setIsSubmitted(true);
  };
  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-lg text-center">
          <CardContent className="p-10">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="text-muted-foreground mt-2">
              Your application has been received. Our team will review it and contact you within 5-7 business days.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <Feather className="mx-auto h-10 w-10 text-primary" />
          <CardTitle className="text-3xl font-bold mt-4">Join as a Practitioner</CardTitle>
          <CardDescription>Complete the application below to join our community of trusted healers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <Progress value={(currentStep / steps.length) * 100} className="w-full" />
            <p className="text-center text-sm text-muted-foreground mt-2">Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location (e.g., City, State or "Online")</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="philosophy">Your Healing Philosophy</Label>
                  <Textarea id="philosophy" name="philosophy" rows={5} value={formData.philosophy} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modalities">Your Modalities</Label>
                  <Textarea id="modalities" name="modalities" placeholder="Separate with commas, e.g., Reiki, Tarot, Somatic Healing" value={formData.modalities} onChange={handleInputChange} required />
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications & Experience</Label>
                  <Textarea id="certifications" name="certifications" rows={6} placeholder="List your relevant credentials, e.g., Certified Mindfulness Teacher - Mindful Institute, 2018" value={formData.certifications} onChange={handleInputChange} required />
                </div>
              </div>
            )}
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                Back
              </Button>
              {currentStep < steps.length ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit">
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}