import { useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useBookingStore, SessionOffering } from '@/stores/bookingStore';
import { useAuthStore } from '@/stores/authStore';
import { ArrowLeft, CheckCircle, Clock, Calendar as CalendarIcon, User, Tag, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import type { Practitioner } from '@shared/types';
// Mock data should be fetched from an API in a real app
const MOCK_PRACTITIONERS: Practitioner[] = [
    { id: '1', name: 'Dr. Althea Sol', imageUrl: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop`, tagline: 'Guiding you to inner peace through mindfulness.', philosophy: 'I believe in a holistic approach to healing, integrating mind, body, and spirit to foster deep, lasting transformation. My work is grounded in compassion, presence, and the belief that everyone holds the innate capacity to heal.', modalities: ['Mindfulness', 'Somatic Healing', 'Reiki', 'Meditation'], certifications: [{ institution: 'Mindful Institute', title: 'Certified Mindfulness Teacher', year: 2018 }, { institution: 'Somatic Experiencing Trauma Institute', title: 'Somatic Healing Practitioner', year: 2020 }], rating: 4.9, reviewCount: 124, location: 'San Francisco, CA' },
    { id: '2', name: 'Marcus Thorne', imageUrl: `https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop`, tagline: 'Unlock your potential with shamanic wisdom.', philosophy: 'My practice is rooted in ancient shamanic traditions, helping you connect with your spirit guides and heal ancestral patterns. I serve as a bridge between worlds to bring back wisdom and healing for your soul\'s journey.', modalities: ['Shamanic Journeying', 'Ancestral Healing', 'Tarot', 'Soul Retrieval'], certifications: [{ institution: 'The Shamanic Path', title: 'Master Shamanic Practitioner', year: 2015 }], rating: 5.0, reviewCount: 98, location: 'Asheville, NC' },
    { id: '3', name: 'Lena Petrova', imageUrl: `https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop`, tagline: 'Somatic healing for embodied wellness.', philosophy: 'Through gentle, body-based practices, we can release trauma and cultivate a profound sense of safety and presence. Healing happens when we learn to listen to the wisdom of the body.', modalities: ['Somatic Healing', 'Yoga Therapy', 'Breathwork'], certifications: [{ institution: 'Embodied Wellness Institute', title: 'Certified Somatic Therapist', year: 2020 }], rating: 4.8, reviewCount: 76, location: 'Online' },
];
const availableTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
export function BookingPage() {
  const { practitionerId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = (location.state as { session: SessionOffering }) || {};
  const addBooking = useBookingStore((state) => state.addBooking);
  const user = useAuthStore((state) => state.user);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const practitioner = MOCK_PRACTITIONERS.find(p => p.id === practitionerId);
  if (!practitioner || !session) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold">Booking Error</h1>
          <p className="text-muted-foreground mt-2">Could not find practitioner or session details. Please try again.</p>
          <Button asChild className="mt-4"><Link to="/discover">Find a Practitioner</Link></Button>
        </div>
      </div>
    );
  }
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      const [hours, minutesPart] = selectedTime.split(':');
      const [minutes, ampm] = minutesPart.split(' ');
      let hour = parseInt(hours, 10);
      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
      const bookingDate = new Date(selectedDate);
      bookingDate.setHours(hour, parseInt(minutes, 10), 0, 0);
      addBooking({ practitioner, session, date: bookingDate });
      setStep(3);
    }
  };
  return (
    <div className="min-h-[calc(100vh-128px)] bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {step < 3 && (
          <Button variant="ghost" onClick={() => step === 1 ? navigate(`/practitioners/${practitionerId}`) : setStep(step - 1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              {step === 1 && 'Confirm Your Session'}
              {step === 2 && 'Select Date & Time'}
              {step === 3 && 'Booking Confirmed!'}
            </CardTitle>
            <CardDescription>
              {step === 1 && `You are booking a session with ${practitioner.name}.`}
              {step === 2 && 'Choose a time that works for you.'}
              {step === 3 && `An invitation has been sent to ${user?.email}.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div>
                <div className="space-y-4 p-4 border rounded-lg bg-background">
                  <h3 className="font-semibold text-lg">Session Details</h3>
                  <div className="flex items-center text-muted-foreground"><Tag className="w-4 h-4 mr-2 text-primary" /> {session.title}</div>
                  <div className="flex items-center text-muted-foreground"><Clock className="w-4 h-4 mr-2 text-primary" /> {session.duration} minutes</div>
                  <div className="flex items-center text-muted-foreground"><DollarSign className="w-4 h-4 mr-2 text-primary" /> ${session.price}</div>
                  <div className="flex items-center text-muted-foreground"><User className="w-4 h-4 mr-2 text-primary" /> With {practitioner.name}</div>
                </div>
                <Button size="lg" className="w-full mt-6" onClick={() => setStep(2)}>
                  Proceed to Scheduling
                </Button>
              </div>
            )}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md border"
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-4 text-center">
                    {selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}
                  </h3>
                  {selectedDate && (
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimes.map(time => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'default' : 'outline'}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="mt-8 border-t pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{session.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDate && selectedTime ? `${format(selectedDate, 'PPP')} at ${selectedTime}` : 'Please select a date and time'}
                    </p>
                  </div>
                  <Button size="lg" disabled={!selectedDate || !selectedTime} onClick={handleConfirmBooking}>
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold">Your session is scheduled!</h2>
                <p className="text-muted-foreground mt-2">
                  You've successfully booked a "{session.title}" session with {practitioner.name} for <br/>
                  <span className="font-semibold text-foreground">{selectedDate && selectedTime ? `${format(selectedDate, 'PPP')} at ${selectedTime}` : ''}</span>.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button asChild>
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/discover">Book Another Session</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}