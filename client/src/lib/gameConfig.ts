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

export const gameConfig: GameConfig = {
  totalRounds: 3,
  initialDuration: 2,
  maxDuration: 16,
  skipIncrement: 2,
  maxSkips: 5,
  songs: [
    {
      id: "song1",
      title: "Song One",
      artist: "Artist One",
      filename: "song1.mp3"
    },
    {
      id: "song2", 
      title: "Song Two",
      artist: "Artist Two",
      filename: "song2.mp3"
    },
    {
      id: "song3",
      title: "Song Three", 
      artist: "Artist Three",
      filename: "song3.mp3"
    }
  ]
};

export const getRoundSong = (roundIndex: number): Song | undefined => {
  return gameConfig.songs[roundIndex];
};

export const getDecoyOptions = (correctSong: Song): Song[] => {
  const decoys = gameConfig.songs.filter(s => s.id !== correctSong.id);
  return [correctSong, ...decoys].sort(() => Math.random() - 0.5);
};
