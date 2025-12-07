import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoundResultProps {
  correct: boolean;
  songTitle: string;
  artist: string;
  attempts: number;
  pointsEarned: number;
  onNextRound: () => void;
  isLastRound: boolean;
}

export default function RoundResult({ 
  correct, 
  songTitle, 
  artist, 
  attempts, 
  pointsEarned,
  onNextRound,
  isLastRound
}: RoundResultProps) {
  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-card rounded-lg border border-card-border text-center">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
        correct ? 'bg-primary/20' : 'bg-destructive/20'
      }`}>
        {correct ? (
          <CheckCircle className="w-10 h-10 text-primary" />
        ) : (
          <XCircle className="w-10 h-10 text-destructive" />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className={`text-lg font-bold ${correct ? 'text-primary' : 'text-destructive'}`}>
          {correct ? 'Correct!' : 'Incorrect!'}
        </p>
        <h3 className="text-xl font-semibold text-white">{songTitle}</h3>
        <p className="text-muted-foreground">{artist}</p>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>Attempts: {attempts}</span>
        <span>|</span>
        <span className="text-primary font-semibold">+{pointsEarned} points</span>
      </div>

      <Button 
        onClick={onNextRound}
        className="rounded-full gap-2"
        data-testid="button-next-round"
      >
        {isLastRound ? 'See Results' : 'Next Round'}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
