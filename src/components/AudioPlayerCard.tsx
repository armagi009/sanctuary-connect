import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Headphones } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
interface AudioPlayerCardProps {
  meditation: {
    title: string;
    author: string;
    duration: number; // in seconds
  };
}
export function AudioPlayerCard({ meditation }: AudioPlayerCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 100 / meditation.duration;
        });
      }, 1000);
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isPlaying, meditation.duration]);
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (progress >= 100) {
        setProgress(0);
      }
      setIsPlaying(true);
    }
  };
  const formatTime = (seconds: number) => {
    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  };
  const currentTime = (progress / 100) * meditation.duration;
  return (
    <Card className="p-6 transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Headphones className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{meditation.title}</h3>
            <p className="text-sm text-muted-foreground">with {meditation.author}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button size="icon" variant="outline" onClick={handlePlayPause} className="rounded-full flex-shrink-0">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <div className="w-full">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(meditation.duration)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}