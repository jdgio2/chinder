
import React from "react";
import { X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SwipeControlsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeControls: React.FC<SwipeControlsProps> = ({ onSwipeLeft, onSwipeRight }) => {
  return (
    <div className="flex justify-center space-x-6 mt-6">
      <Button
        variant="outline"
        size="lg"
        className="rounded-full h-16 w-16 border-2 border-red-500 text-red-500 hover:bg-red-50"
        onClick={onSwipeLeft}
      >
        <X className="h-8 w-8" />
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="rounded-full h-16 w-16 border-2 border-green-500 text-green-500 hover:bg-green-50"
        onClick={onSwipeRight}
      >
        <Heart className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default SwipeControls;
