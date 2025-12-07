import { Music, HelpCircle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onHelpClick: () => void;
  currentRound: number;
  totalRounds: number;
  score: number;
}

export default function Header({ onHelpClick, currentRound, totalRounds, score }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border">
      <div className="flex items-center gap-2">
        <Music className="w-6 h-6 text-primary" />
        <span className="text-lg font-bold text-white">Songless Unlimited</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Round</span>
          <span className="text-white font-semibold">{currentRound}/{totalRounds}</span>
          <span className="mx-2 text-muted-foreground">|</span>
          <span className="text-muted-foreground">Score</span>
          <span className="text-primary font-semibold">{score}</span>
        </div>
        
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={onHelpClick}
          data-testid="button-help"
          aria-label="How to play"
        >
          <HelpCircle className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
