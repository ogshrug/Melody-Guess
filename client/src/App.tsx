import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StartScreen from "@/components/StartScreen";
import GameScreen from "@/components/GameScreen";
import ResultScreen from "@/components/ResultScreen";
import HowToPlayModal from "@/components/HowToPlayModal";

type GameState = "start" | "playing" | "results";

interface RoundResult {
  songTitle: string;
  artist: string;
  correct: boolean;
  attempts: number;
}

function App() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [gameResults, setGameResults] = useState<RoundResult[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  const handleStartGame = () => {
    setGameState("playing");
    setGameResults([]);
    setTotalScore(0);
  };

  const handleGameEnd = (results: RoundResult[], score: number) => {
    setGameResults(results);
    setTotalScore(score);
    setGameState("results");
  };

  const handlePlayAgain = () => {
    setGameState("start");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          {gameState === "start" && (
            <StartScreen 
              onStart={handleStartGame}
              onHowToPlay={() => setShowHowToPlay(true)}
            />
          )}

          {gameState === "playing" && (
            <GameScreen onGameEnd={handleGameEnd} />
          )}

          {gameState === "results" && (
            <ResultScreen 
              results={gameResults}
              totalScore={totalScore}
              onPlayAgain={handlePlayAgain}
            />
          )}

          <HowToPlayModal 
            isOpen={showHowToPlay}
            onClose={() => setShowHowToPlay(false)}
            onPlay={handleStartGame}
          />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
