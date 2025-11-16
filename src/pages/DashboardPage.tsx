import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useBookingStore, BookedSession } from '@/stores/bookingStore';
import { useReviewStore, NewReview } from '@/stores/reviewStore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, User, Settings, Clock, Video, Sparkles, History, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ReviewForm } from '@/components/ReviewForm';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const bookedSessions = useBookingStore((state) => state.bookedSessions);
  const addReview = useReviewStore((state) => state.addReview);
  const allReviews = useReviewStore((state) => state.reviews);
  const [sessionToReview, setSessionToReview] = useState<BookedSession | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  if (!user) {
    return null; // ProtectedRoute should prevent this
  }
  const now = new Date();
  const upcomingSessions = bookedSessions
    .filter(session => new Date(session.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastSessions = bookedSessions
    .filter(session => new Date(session.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const reviewedSessionIds = new Set(allReviews.map(r => r.practitionerId + r.reviewerName)); // Simple check
  const handleReviewSubmit = (review: NewReview) => {
    const reviewer = {
      name: user.name,
      imageUrl: `https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`,
    };
    addReview(review, reviewer);
    toast.success('Thank you for your review!', {
      description: 'Your feedback helps our community grow.',
    });
    setIsReviewDialogOpen(false);
    setSessionToReview(null);
  };
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Seeker Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome, {user.name}. Manage your sessions, profile, and account settings.</p>
          </header>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 md:w-auto">
              <TabsTrigger value="upcoming"><Calendar className="w-4 h-4 mr-2" /> Upcoming</TabsTrigger>
              <TabsTrigger value="past"><History className="w-4 h-4 mr-2" /> Past Sessions</TabsTrigger>
              <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" /> Profile</TabsTrigger>
              <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" /> Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-6">
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
                          <Button asChild>
                            <Link to={`/session/${session.id}`}>
                              <Video className="w-4 h-4 mr-2" /> Join Session
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-12">
                      <Sparkles className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-semibold">No upcoming sessions</h3>
                      <p className="mt-1 text-sm">You have not booked any sessions yet.</p>
                      <div className="mt-6">
                        <Button asChild><Link to="/discover">Discover Practitioners</Link></Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="past" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Past Sessions</CardTitle>
                  <CardDescription>Review your past sessions and share your experience to help the community.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pastSessions.length > 0 ? (
                    pastSessions.map(session => {
                      const hasReviewed = reviewedSessionIds.has(session.practitioner.id + user.name);
                      return (
                        <div key={session.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg">
                          <div className="mb-4 sm:mb-0">
                            <h4 className="font-semibold">{session.session.title} with {session.practitioner.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {format(new Date(session.date), 'PPP, p')}</span>
                              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {session.session.duration} min</span>
                            </div>
                          </div>
                          <Button variant="secondary" disabled={hasReviewed} onClick={() => { setSessionToReview(session); setIsReviewDialogOpen(true); }}>
                            <MessageSquarePlus className="w-4 h-4 mr-2" /> {hasReviewed ? 'Review Submitted' : 'Leave a Review'}
                          </Button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-muted-foreground py-12">
                      <History className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-semibold">No past sessions</h3>
                      <p className="mt-1 text-sm">Your completed sessions will appear here.</p>
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
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => toast.success('Profile updated successfully!')}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your password and notification preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => toast.success('Password changed successfully!')}>Change Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Leave a Review</DialogTitle>
          </DialogHeader>
          {sessionToReview && (
            <ReviewForm
              practitionerName={sessionToReview.practitioner.name}
              sessionTitle={sessionToReview.session.title}
              practitionerId={sessionToReview.practitioner.id}
              onSubmit={handleReviewSubmit}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}