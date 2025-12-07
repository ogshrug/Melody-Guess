import { Music, Volume2, ThumbsUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlay?: () => void;
}

export default function HowToPlayModal({ isOpen, onClose, onPlay }: HowToPlayModalProps) {
  const handlePlay = () => {
    onClose();
    onPlay?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold tracking-wider text-muted-foreground">
            HOW TO PLAY
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-start gap-4">
            <Music className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              Listen to the intro, then find the correct song in the list.
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <Volume2 className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              Skipped or incorrect attempts unlock more of the intro.
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <ThumbsUp className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              Answer in as few tries as possible and share your score!
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <Button 
            onClick={handlePlay}
            className="rounded-full px-8"
            data-testid="button-modal-play"
          >
            PLAY
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
