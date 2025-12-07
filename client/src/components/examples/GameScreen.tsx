import GameScreen from '../GameScreen';

export default function GameScreenExample() {
  return (
    <GameScreen 
      onGameEnd={(results, score) => console.log('Game ended:', results, score)}
    />
  );
}
