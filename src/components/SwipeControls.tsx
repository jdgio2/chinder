
import React from "react";
import { X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SwipeControlsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isAnimating?: boolean; // Add a prop to track whether a card is currently animating
}

const SwipeControls: React.FC<SwipeControlsProps> = ({ 
  onSwipeLeft, 
  onSwipeRight,
  isAnimating = false 
}) => {
  // Add a CSS class to prevent text selection during swipe
  React.useEffect(() => {
    if (isAnimating) {
      // Prevent text selection while swiping
      document.body.classList.add('select-none');
    } else {
      document.body.classList.remove('select-none');
    }
    
    return () => {
      // Clean up - ensure we remove the class when component unmounts
      document.body.classList.remove('select-none');
    };
  }, [isAnimating]);

  return (
    <div className={`flex justify-center space-x-6 mt-6 ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
      <Button
        variant="outline"
        size="lg"
        className="rounded-full h-16 w-16 border-2 border-red-500 text-red-500 hover:bg-red-50"
        onClick={onSwipeLeft}
        disabled={isAnimating}
        aria-label="Dislike"
      >
        <X className="h-8 w-8" />
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="rounded-full h-16 w-16 border-2 border-green-500 text-green-500 hover:bg-green-50"
        onClick={onSwipeRight}
        disabled={isAnimating}
        aria-label="Like"
      >
        <Heart className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default SwipeControls;
