export interface Song {
  id: string;
  title: string;
  artist: string;
  filename: string;
}

export interface GameConfig {
  totalRounds: number;
  initialDuration: number;
  maxDuration: number;
  skipIncrement: number;
  maxSkips: number;
  songs: Song[];
}

export const defaultGameConfig: GameConfig = {
  totalRounds: 3,
  initialDuration: 2,
  maxDuration: 16,
  skipIncrement: 2,
  maxSkips: 5,
  songs: []
};

export const getRoundSong = (config: GameConfig, roundIndex: number): Song | undefined => {
  return config.songs[roundIndex];
};

export const getDecoyOptions = (config: GameConfig, correctSong: Song): Song[] => {
  const decoys = config.songs.filter(s => s.id !== correctSong.id);
  return [correctSong, ...decoys].sort(() => Math.random() - 0.5);
};
