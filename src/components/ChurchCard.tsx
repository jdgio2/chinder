
import React, { useState } from "react";
import { Church } from "@/types";
import { Star, Map, Clock, MapPin, Globe, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SwipeOverlay from "@/components/SwipeOverlay";

interface ChurchCardProps {
  church: Church;
  onSwipe: (direction: "left" | "right") => void;
  onViewDetails: () => void;
}

const ChurchCard: React.FC<ChurchCardProps> = ({ church, onSwipe, onViewDetails }) => {
  const [dragging, setDragging] = useState<"left" | "right" | null>(null);
  const [swipeClass, setSwipeClass] = useState<string>("");
  const [swipeProgress, setSwipeProgress] = useState<number>(0);

  // Calculate some display values
  const mainImage = church.images[0];
  const displayDays = Object.keys(church.serviceTimes).slice(0, 2);

  // Handle touch/mouse gestures
  const handleDragStart = (clientX: number) => {
    setDragging(null);
    setSwipeProgress(0);
    return clientX;
  };

  const handleDragMove = (startX: number, currentX: number) => {
    const deltaX = currentX - startX;
    const cardWidth = document.querySelector('.swipe-card')?.clientWidth || 300;
    const progress = Math.min(Math.abs(deltaX) / (cardWidth * 0.5), 1);
    
    setSwipeProgress(progress);
    
    if (Math.abs(deltaX) < 50) {
      setDragging(null);
      return;
    }
    setDragging(deltaX > 0 ? "right" : "left");
  };

  const handleDragEnd = () => {
    if (dragging === "left") {
      setSwipeClass("animate-swipe-left");
      setTimeout(() => {
        onSwipe("left");
        setSwipeClass("");
      }, 300);
    } else if (dragging === "right") {
      setSwipeClass("animate-swipe-right");
      setTimeout(() => {
        onSwipe("right");
        setSwipeClass("");
      }, 300);
    }
    setDragging(null);
    setSwipeProgress(0);
  };

  // Mouse event handlers
  const [startX, setStartX] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(handleDragStart(e.clientX));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX !== null) {
      handleDragMove(startX, e.clientX);
    }
  };

  const handleMouseUp = () => {
    setStartX(null);
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (startX !== null) {
      setStartX(null);
      setDragging(null);
      setSwipeProgress(0);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(handleDragStart(e.touches[0].clientX));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX !== null) {
      handleDragMove(startX, e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
    handleDragEnd();
  };

  return (
    <div
      className={`swipe-card rounded-xl overflow-hidden shadow-lg bg-white ${swipeClass} ${
        dragging ? `dragging-${dragging}` : ""
      } select-none`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe overlay for YES/NO feedback */}
      <SwipeOverlay direction={dragging} swipeProgress={swipeProgress} />
      
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${mainImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="text-2xl font-bold">{church.name}</h2>
          <div className="flex items-center mt-1 space-x-1">
            <Star className="w-4 h-4 text-church-gold" fill="currentColor" />
            <span>{church.matchPercentage}% match</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700">{church.address}</p>
            <p className="text-sm text-church-blue font-medium">
              {church.distance} miles away
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-100 text-church-blue rounded-full text-xs">
            {church.denomination}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-church-purple rounded-full text-xs">
            {church.worshipStyle}
          </span>
          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
            {church.sizeCategory}
          </span>
        </div>

        <div className="flex items-start">
          <Clock className="w-5 h-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            {displayDays.map((day) => (
              <div key={day} className="flex text-sm">
                <span className="font-medium w-24">{day}:</span>
                <span>{church.serviceTimes[day].join(", ")}</span>
              </div>
            ))}
            {Object.keys(church.serviceTimes).length > 2 && (
              <span className="text-xs text-muted-foreground">+ more times</span>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          className="w-full mt-2"
        >
          View Details
        </Button>
      </div>

      {/* Gesture hints */}
      <div className="gesture-hint gesture-hint-left">
        <ArrowLeft className="h-8 w-8" />
      </div>
      <div className="gesture-hint gesture-hint-right">
        <ArrowRight className="h-8 w-8" />
      </div>
    </div>
  );
};

export default ChurchCard;
