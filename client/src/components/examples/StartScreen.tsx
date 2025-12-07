import StartScreen from '../StartScreen';

export default function StartScreenExample() {
  return (
    <StartScreen 
      onStart={() => console.log('Game started')}
      onHowToPlay={() => console.log('How to play clicked')}
    />
  );
}
