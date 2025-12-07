import ResultScreen from '../ResultScreen';

const mockResults = [
  { songTitle: 'Bohemian Rhapsody', artist: 'Queen', correct: true, attempts: 2 },
  { songTitle: 'Hotel California', artist: 'Eagles', correct: false, attempts: 5 },
  { songTitle: 'Sweet Child O Mine', artist: "Guns N' Roses", correct: true, attempts: 1 },
];

export default function ResultScreenExample() {
  return (
    <ResultScreen 
      results={mockResults}
      totalScore={450}
      onPlayAgain={() => console.log('Play again clicked')}
    />
  );
}
