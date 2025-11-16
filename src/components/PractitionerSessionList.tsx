import { useBookingStore } from '@/stores/bookingStore';
import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { MOCK_PRACTITIONERS } from '@/data/mockData';
export function PractitionerSessionList() {
  const allBookedSessions = useBookingStore((state) => state.bookedSessions);
  const practitionerUser = useAuthStore((state) => state.user);
  // For demo purposes, we'll find the practitioner profile that matches the logged-in user's name.
  // In a real app, the user object would have a practitioner ID.
  const currentPractitioner = MOCK_PRACTITIONERS.find(p => p.name === practitionerUser?.name) || MOCK_PRACTITIONERS[0];
  const practitionerSessions = allBookedSessions.filter(
    session => session.practitioner.id === currentPractitioner.id
  );
  const now = new Date();
  const upcomingSessions = practitionerSessions
    .filter(session => new Date(session.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastSessions = practitionerSessions
    .filter(session => new Date(session.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Here are your scheduled sessions with seekers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map(session => (
              <div key={session.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-background">
                <div className="mb-4 sm:mb-0">
                  <h4 className="font-semibold">{session.session.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {format(new Date(session.date), 'PPP, p')}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {session.session.duration} min</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    {/* In a real app, we'd have the seeker's name stored with the booking */}
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> With a Seeker</span>
                  </div>
                </div>
                <Button><Video className="w-4 h-4 mr-2" /> Start Session</Button>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No upcoming sessions.</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Past Sessions</CardTitle>
          <CardDescription>A history of your completed sessions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pastSessions.length > 0 ? (
            pastSessions.map(session => (
              <div key={session.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-background opacity-70">
                <div className="mb-4 sm:mb-0">
                  <h4 className="font-semibold">{session.session.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {format(new Date(session.date), 'PPP')}</span>
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> With a Seeker</span>
                  </div>
                </div>
                <Button variant="ghost" disabled>Completed</Button>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No past sessions yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}