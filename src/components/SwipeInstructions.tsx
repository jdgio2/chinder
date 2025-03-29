
import React from "react";
import { X, Heart, Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SwipeInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const SwipeInstructions: React.FC<SwipeInstructionsProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2 text-church-purple" />
            How to Use Chinder
          </DialogTitle>
          <DialogDescription>
            Find your perfect church match with our simple swipe system.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Heart className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Swipe Right</h3>
                <p className="text-sm text-muted-foreground">For churches you're interested in</p>
              </div>
            </div>
            <div className="text-green-500 font-bold text-xl">YES</div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <X className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium">Swipe Left</h3>
                <p className="text-sm text-muted-foreground">For churches you're not interested in</p>
              </div>
            </div>
            <div className="text-red-500 font-bold text-xl">NO</div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-sm">
              You can also tap the buttons below each church card to like or dislike without swiping.
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button onClick={onClose}>Got it!</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwipeInstructions;
