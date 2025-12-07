import GuessInput from '../GuessInput';

const mockSongs = [
  { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen' },
  { id: '2', title: 'Hotel California', artist: 'Eagles' },
  { id: '3', title: 'Stairway to Heaven', artist: 'Led Zeppelin' },
  { id: '4', title: 'Imagine', artist: 'John Lennon' },
  { id: '5', title: 'Sweet Child O Mine', artist: "Guns N' Roses" },
];

export default function GuessInputExample() {
  return (
    <div className="p-8 bg-background">
      <GuessInput 
        songs={mockSongs}
        onSubmit={(songId) => console.log('Submitted:', songId)}
      />
    </div>
  );
}
