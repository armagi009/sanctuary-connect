import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Calendar, Video, FileText, Notebook } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { PractitionerProfileForm } from '@/components/PractitionerProfileForm';
import { PractitionerSessionList } from '@/components/PractitionerSessionList';
import { PractitionerAvailability } from '@/components/PractitionerAvailability';
import { PractitionerContent } from '@/components/PractitionerContent';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SessionNoteForm } from '@/components/SessionNoteForm';
import { useSessionNotesStore, NewSessionNote } from '@/stores/sessionNotesStore';
import { BookedSession } from '@/stores/bookingStore';
import { toast } from 'sonner';
export function PractitionerDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const addNote = useSessionNotesStore((state) => state.addNote);
  const [sessionForNote, setSessionForNote] = useState<BookedSession | null>(null);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  if (!user) {
    return null; // Should be handled by ProtectedRoute
  }
  const handleOpenNoteDialog = (session: BookedSession) => {
    setSessionForNote(session);
    setIsNoteDialogOpen(true);
  };
  const handleNoteSubmit = (note: NewSessionNote) => {
    addNote(note);
    toast.success('Note shared successfully!', {
      description: 'The seeker can now view your notes in their dashboard.',
    });
    setIsNoteDialogOpen(false);
    setSessionForNote(null);
  };
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Practitioner Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome, {user.name}. Manage your practice and connect with seekers.</p>
          </header>
          <Tabs defaultValue="sessions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 md:w-auto">
              <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" /> Profile</TabsTrigger>
              <TabsTrigger value="sessions"><Video className="w-4 h-4 mr-2" /> Sessions</TabsTrigger>
              <TabsTrigger value="availability"><Calendar className="w-4 h-4 mr-2" /> Availability</TabsTrigger>
              <TabsTrigger value="content"><FileText className="w-4 h-4 mr-2" /> Content</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-6">
              <PractitionerProfileForm />
            </TabsContent>
            <TabsContent value="sessions" className="mt-6">
              <PractitionerSessionList onShareNote={handleOpenNoteDialog} />
            </TabsContent>
            <TabsContent value="availability" className="mt-6">
              <PractitionerAvailability />
            </TabsContent>
            <TabsContent value="content" className="mt-6">
              <PractitionerContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Share Session Notes</DialogTitle>
          </DialogHeader>
          {sessionForNote && (
            <SessionNoteForm
              sessionId={sessionForNote.id}
              practitionerId={sessionForNote.practitioner.id}
              seekerId={"user1"} // Mocking seeker ID
              onSubmit={handleNoteSubmit}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}