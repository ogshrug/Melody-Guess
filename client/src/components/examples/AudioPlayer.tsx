import AudioPlayer from '../AudioPlayer';

export default function AudioPlayerExample() {
  return (
    <AudioPlayer 
      audioSrc=""
      maxDuration={16}
      onSkip={() => console.log('Skip clicked')}
      skipsUsed={1}
      maxSkips={5}
    />
  );
}
