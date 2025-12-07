import { Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StartScreenProps {
  onStart: () => void;
  onHowToPlay: () => void;
}

export default function StartScreen({ onStart, onHowToPlay }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8 bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
          <Music className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-white">Songless Unlimited</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Test your music knowledge! Listen to song intros and guess the title.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button 
          size="lg" 
          onClick={onStart}
          className="rounded-full text-lg gap-2"
          data-testid="button-start-game"
        >
          <Play className="w-5 h-5" />
          Start Game
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          onClick={onHowToPlay}
          className="rounded-full"
          data-testid="button-how-to-play"
        >
          How to Play
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        3 rounds of music trivia await!
      </p>
    </div>
  );
}
