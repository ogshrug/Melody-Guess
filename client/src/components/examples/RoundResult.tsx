import RoundResult from '../RoundResult';

export default function RoundResultExample() {
  return (
    <div className="p-8 bg-background">
      <RoundResult 
        correct={true}
        songTitle="Bohemian Rhapsody"
        artist="Queen"
        attempts={2}
        pointsEarned={150}
        onNextRound={() => console.log('Next round clicked')}
        isLastRound={false}
      />
    </div>
  );
}
