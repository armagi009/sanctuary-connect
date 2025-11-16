import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingStore } from '@/stores/bookingStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Clock } from 'lucide-react';
import { format } from 'date-fns';
export function SessionPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const session = useBookingStore((state) => state.bookedSessions.find(s => s.id === sessionId));
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  if (!session) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold">Session Not Found</h1>
          <p className="text-muted-foreground mt-2">The session you are looking for does not exist or has ended.</p>
        </div>
      </div>
    );
  }
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  const practitionerInitials = session.practitioner.name.split(' ').map(n => n[0]).join('');
  return (
    <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-5xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Digital Sanctum</CardTitle>
          <p className="text-muted-foreground">{session.session.title} with {session.practitioner.name}</p>
          <p className="text-sm text-muted-foreground">Scheduled for: {format(new Date(session.date), 'PPP, p')}</p>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-black rounded-lg flex items-center justify-center overflow-hidden">
            <img src="https://images.unsplash.com/photo-1554189097-c48c982a9de1?q=80&w=1200&auto=format&fit=crop" alt="Calm background" className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm" />
            <div className="z-10 text-white text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-white/50">
                <AvatarImage src={session.practitioner.imageUrl} alt={session.practitioner.name} />
                <AvatarFallback className="text-4xl">{practitionerInitials}</AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold">{session.practitioner.name}</h3>
              <p className="text-lg opacity-80">Video Feed Placeholder</p>
            </div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-md flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{formatTime(elapsedTime)} / {session.session.duration}:00</span>
            </div>
          </div>
          <div className="mt-6 flex justify-center items-center gap-4">
            <Button variant={isMicOn ? "secondary" : "destructive"} size="icon" className="h-12 w-12 rounded-full" onClick={() => setIsMicOn(!isMicOn)}>
              {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </Button>
            <Button variant={isCameraOn ? "secondary" : "destructive"} size="icon" className="h-12 w-12 rounded-full" onClick={() => setIsCameraOn(!isCameraOn)}>
              {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>
            <Button variant="destructive" size="icon" className="h-14 w-14 rounded-full" onClick={() => navigate('/dashboard')}>
              <PhoneOff className="w-7 h-7" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}