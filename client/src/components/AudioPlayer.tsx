import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AudioPlayerProps {
  audioSrc: string;
  maxDuration: number;
  onSkip: () => void;
  skipsUsed: number;
  maxSkips: number;
}

export default function AudioPlayer({ 
  audioSrc, 
  maxDuration, 
  onSkip, 
  skipsUsed, 
  maxSkips 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / maxDuration) * 100;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= maxDuration) {
        audio.pause();
        audio.currentTime = 0;
        setCurrentTime(0);
        setIsPlaying(false);
      } else {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [maxDuration]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setCurrentTime(0);
      setIsPlaying(false);
      setIsLoading(true);
    }
  }, [audioSrc]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const canSkip = skipsUsed < maxSkips;

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-card rounded-lg border border-card-border">
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      
      <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center shadow-lg shadow-primary/10">
        <Music className="w-24 h-24 text-muted-foreground" />
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground w-12 text-right">
            {formatTime(currentTime)}
          </span>
          <Progress value={progressPercent} className="flex-1 h-2" />
          <span className="text-sm text-muted-foreground w-12">
            {formatTime(maxDuration)}
          </span>
        </div>

        <div className="flex items-center justify-center">
          <Button
            size="lg"
            className="w-16 h-16 rounded-full"
            onClick={togglePlay}
            disabled={isLoading}
            data-testid="button-play-pause"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={onSkip}
        disabled={!canSkip}
        data-testid="button-skip"
        className="rounded-full"
      >
        SKIP (+{Math.min(2, maxSkips - skipsUsed)}s) - {maxSkips - skipsUsed} left
      </Button>
    </div>
  );
}
