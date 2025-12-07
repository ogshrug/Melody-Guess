import { useState } from 'react';
import HowToPlayModal from '../HowToPlayModal';
import { Button } from '@/components/ui/button';

export default function HowToPlayModalExample() {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>Open How to Play</Button>
      <HowToPlayModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        onPlay={() => console.log('Play clicked')}
      />
    </div>
  );
}
