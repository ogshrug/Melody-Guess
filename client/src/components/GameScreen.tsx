import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import AudioPlayer from "./AudioPlayer";
import GuessInput from "./GuessInput";
import RoundResult from "./RoundResult";
import HowToPlayModal from "./HowToPlayModal";
import { type GameConfig, type Song, defaultGameConfig, getRoundSong, getDecoyOptions } from "@/lib/gameConfig";

interface RoundResultData {
  songTitle: string;
  artist: string;
  correct: boolean;
  attempts: number;
  points: number;
}

interface GameScreenProps {
  onGameEnd: (results: RoundResultData[], totalScore: number) => void;
}

export default function GameScreen({ onGameEnd }: GameScreenProps) {
  const { data: gameConfig = defaultGameConfig, isLoading } = useQuery<GameConfig>({
    queryKey: ["/api/game-config"],
  });

  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [skipsUsed, setSkipsUsed] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(gameConfig.initialDuration);
  const [showResult, setShowResult] = useState(false);
  const [roundCorrect, setRoundCorrect] = useState(false);
  const [roundPoints, setRoundPoints] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [results, setResults] = useState<RoundResultData[]>([]);
  const [songOptions, setSongOptions] = useState<Song[]>([]);

  const currentSong = getRoundSong(gameConfig, currentRound);

  useEffect(() => {
    if (gameConfig.initialDuration) {
      setCurrentDuration(gameConfig.initialDuration);
    }
  }, [gameConfig.initialDuration]);

  useEffect(() => {
    if (currentSong) {
      setSongOptions(getDecoyOptions(gameConfig, currentSong));
    }
  }, [currentRound, currentSong, gameConfig]);

  const calculatePoints = (attemptsUsed: number, skips: number): number => {
    const basePoints = 200;
    const attemptPenalty = (attemptsUsed - 1) * 20;
    const skipPenalty = skips * 10;
    return Math.max(0, basePoints - attemptPenalty - skipPenalty);
  };

  const handleGuess = (songId: string) => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (songId === currentSong?.id) {
      const points = calculatePoints(newAttempts, skipsUsed);
      setRoundPoints(points);
      setScore(prev => prev + points);
      setRoundCorrect(true);
      setShowResult(true);
    } else {
      setCurrentDuration(prev => Math.min(prev + 2, gameConfig.maxDuration));
      
      if (newAttempts >= 5) {
        setRoundPoints(0);
        setRoundCorrect(false);
        setShowResult(true);
      }
    }
  };

  const handleSkip = () => {
    if (skipsUsed < gameConfig.maxSkips) {
      setSkipsUsed(prev => prev + 1);
      setCurrentDuration(prev => Math.min(prev + gameConfig.skipIncrement, gameConfig.maxDuration));
    }
  };

  const handleNextRound = () => {
    const result: RoundResultData = {
      songTitle: currentSong?.title || '',
      artist: currentSong?.artist || '',
      correct: roundCorrect,
      attempts: attempts,
      points: roundPoints
    };
    
    const newResults = [...results, result];
    setResults(newResults);

    if (currentRound >= gameConfig.totalRounds - 1) {
      onGameEnd(newResults, score);
    } else {
      setCurrentRound(prev => prev + 1);
      setAttempts(0);
      setSkipsUsed(0);
      setCurrentDuration(gameConfig.initialDuration);
      setShowResult(false);
      setRoundCorrect(false);
      setRoundPoints(0);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading game...</p>
        </div>
      </div>
    );
  }

  if (!currentSong || gameConfig.songs.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold text-white mb-4">No Songs Configured</h2>
          <p className="text-muted-foreground mb-4">
            Please add songs to the game by editing the configuration file at:
          </p>
          <code className="bg-card px-3 py-2 rounded text-sm text-primary block">
            songs/game-config.json
          </code>
          <p className="text-muted-foreground mt-4 text-sm">
            Add your MP3 files to the /songs folder and update the configuration.
          </p>
        </div>
      </div>
    );
  }

  const audioSrc = `/songs/${currentSong.filename}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        onHelpClick={() => setShowHelp(true)}
        currentRound={currentRound + 1}
        totalRounds={gameConfig.totalRounds}
        score={score}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
        {showResult ? (
          <RoundResult
            correct={roundCorrect}
            songTitle={currentSong.title}
            artist={currentSong.artist}
            attempts={attempts}
            pointsEarned={roundPoints}
            onNextRound={handleNextRound}
            isLastRound={currentRound >= gameConfig.totalRounds - 1}
          />
        ) : (
          <>
            <AudioPlayer
              audioSrc={audioSrc}
              maxDuration={currentDuration}
              onSkip={handleSkip}
              skipsUsed={skipsUsed}
              maxSkips={gameConfig.maxSkips}
            />

            <GuessInput
              songs={songOptions}
              onSubmit={handleGuess}
            />

            <p className="text-sm text-muted-foreground">
              Attempts: {attempts}/5
            </p>
          </>
        )}
      </main>

      <HowToPlayModal 
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
