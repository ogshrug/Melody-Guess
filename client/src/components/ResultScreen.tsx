import { Trophy, RotateCcw, Share2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RoundResult {
  songTitle: string;
  artist: string;
  correct: boolean;
  attempts: number;
}

interface ResultScreenProps {
  results: RoundResult[];
  totalScore: number;
  onPlayAgain: () => void;
}

export default function ResultScreen({ results, totalScore, onPlayAgain }: ResultScreenProps) {
  const correctCount = results.filter(r => r.correct).length;
  const totalRounds = results.length;

  const getMessage = () => {
    const percentage = (correctCount / totalRounds) * 100;
    if (percentage === 100) return "Perfect! You're a music genius!";
    if (percentage >= 66) return "Great job! You know your music!";
    if (percentage >= 33) return "Not bad! Keep practicing!";
    return "Better luck next time!";
  };

  const handleShare = () => {
    const text = `Songless Unlimited\n${correctCount}/${totalRounds} correct\nScore: ${totalScore}\n\nPlay at: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8 bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
          <Trophy className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-white">Game Over!</h1>
        <p className="text-muted-foreground text-center">{getMessage()}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-6xl font-bold text-primary" data-testid="text-final-score">
          {totalScore}
        </span>
        <span className="text-muted-foreground">Total Score</span>
        <span className="text-lg text-white mt-2">
          {correctCount} / {totalRounds} correct
        </span>
      </div>

      <Card className="w-full max-w-md p-4">
        <div className="flex flex-col gap-3">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-md"
              data-testid={`result-round-${index + 1}`}
            >
              {result.correct ? (
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {result.songTitle}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {result.artist}
                </p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {result.attempts} {result.attempts === 1 ? 'try' : 'tries'}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3 w-full max-w-xs">
        <Button 
          variant="outline"
          size="lg"
          onClick={handleShare}
          className="flex-1 rounded-full gap-2"
          data-testid="button-share"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Button 
          size="lg"
          onClick={onPlayAgain}
          className="flex-1 rounded-full gap-2"
          data-testid="button-play-again"
        >
          <RotateCcw className="w-4 h-4" />
          Play Again
        </Button>
      </div>
    </div>
  );
}
