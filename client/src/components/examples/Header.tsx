import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      onHelpClick={() => console.log('Help clicked')}
      currentRound={2}
      totalRounds={3}
      score={150}
    />
  );
}
