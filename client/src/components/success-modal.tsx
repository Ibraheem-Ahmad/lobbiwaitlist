import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 text-center" data-testid="modal-success">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="text-white text-2xl" />
        </div>
        <h3 className="text-2xl font-bold mb-4" data-testid="text-success-title">Welcome to the Waitlist!</h3>
        <p className="text-muted-foreground mb-6" data-testid="text-success-description">
          Thanks for joining! We'll keep you updated on our launch progress and send you early access when we're ready.
        </p>
        <Button 
          onClick={onClose}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium"
          data-testid="button-close-modal"
        >
          Got it!
        </Button>
      </DialogContent>
    </Dialog>
  );
}
