import { useAuthStore } from '@/stores/authStore';
import { useBookingStore } from '@/stores/bookingStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, User, Settings, Clock, Video, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const bookedSessions = useBookingStore((state) => state.bookedSessions);
  if (!user) {
    return null; // Or a loading spinner, though ProtectedRoute should prevent this
  }
  const upcomingSessions = bookedSessions
    .filter(session => new Date(session.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name}</h1>
          <p className="text-muted-foreground mt-1">Manage your sessions, profile, and account settings.</p>
        </header>
        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="sessions"><Calendar className="w-4 h-4 mr-2" /> Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" /> Profile</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" /> Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="sessions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Here are your scheduled sessions. You will receive a reminder 24 hours before.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.length > 0 ? (
                  upcomingSessions.map(session => (
                    <div key={session.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg">
                      <div className="mb-4 sm:mb-0">
                        <h4 className="font-semibold">{session.session.title} with {session.practitioner.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {format(new Date(session.date), 'PPP, p')}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {session.session.duration} min</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Reschedule</Button>
                        <Button><Video className="w-4 h-4 mr-2" /> Join Session</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <Sparkles className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No upcoming sessions</h3>
                    <p className="mt-1 text-sm text-gray-500">You have not booked any sessions yet.</p>
                    <div className="mt-6">
                      <Button asChild>
                        <Link to="/discover">
                          Discover Practitioners
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="profile" className="mt-6">
             <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>This information is private and only used for your session experience.</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground py-12">
                <p>Profile management coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your email, password, and notification preferences.</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground py-12">
                <p>Account settings management coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}