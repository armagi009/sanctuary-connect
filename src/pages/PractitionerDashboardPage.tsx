import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Calendar, Video, FileText } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
export function PractitionerDashboardPage() {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return null; // Should be handled by ProtectedRoute
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Practitioner Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome, {user.name}. Manage your practice and connect with seekers.</p>
        </header>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 md:w-auto">
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" /> Profile</TabsTrigger>
            <TabsTrigger value="availability"><Calendar className="w-4 h-4 mr-2" /> Availability</TabsTrigger>
            <TabsTrigger value="sessions"><Video className="w-4 h-4 mr-2" /> Sessions</TabsTrigger>
            <TabsTrigger value="content"><FileText className="w-4 h-4 mr-2" /> Content</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Public Profile</CardTitle>
                <CardDescription>This is how seekers will see you on the platform. Keep it up to date.</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground py-12">
                <p>Profile management features coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="availability" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Availability</CardTitle>
                <CardDescription>Set your schedule so seekers can book sessions with you.</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground py-12">
                <p>Calendar and availability management coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sessions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming & Past Sessions</CardTitle>
                <CardDescription>View your scheduled sessions and session history.</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground py-12">
                <p>Session management features coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="content" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Content</CardTitle>
                <CardDescription>Share your wisdom by writing articles or recording guided meditations.</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground py-12">
                <p>Content creation and management tools coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}