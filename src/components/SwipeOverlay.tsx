
import React from "react";
import { X, Heart } from "lucide-react";

interface SwipeOverlayProps {
  direction: "left" | "right" | null;
  swipeProgress: number; // Value between 0 and 1 indicating how far the swipe has progressed
}

const SwipeOverlay: React.FC<SwipeOverlayProps> = ({ direction, swipeProgress }) => {
  if (!direction) return null;

  const opacity = Math.min(swipeProgress * 2, 1); // Double the opacity increase rate for visibility
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {direction === "left" ? (
        <div 
          className="flex items-center bg-red-500/20 rounded-full p-4 transform -rotate-12"
          style={{ opacity }}
        >
          <X className="h-12 w-12 text-red-500 mr-2" />
          <span className="text-3xl font-bold text-red-500">NO</span>
        </div>
      ) : (
        <div 
          className="flex items-center bg-green-500/20 rounded-full p-4 transform rotate-12"
          style={{ opacity }}
        >
          <Heart className="h-12 w-12 text-green-500 mr-2" />
          <span className="text-3xl font-bold text-green-500">YES</span>
        </div>
      )}
    </div>
  );
};

export default SwipeOverlay;
