
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ChurchCard from "@/components/ChurchCard";
import SwipeControls from "@/components/SwipeControls";
import SwipeOverlay from "@/components/SwipeOverlay";
import SwipeInstructions from "@/components/SwipeInstructions";
import ChurchDetails from "@/components/ChurchDetails";
import { Church } from "@/types";
import { churches as initialChurches } from "@/data/mockData";
import { Church as ChurchIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Discover = () => {
  const [churches, setChurches] = useState<Church[]>([...initialChurches]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [matches, setMatches] = useState<Record<string, boolean>>({});
  const [isCardAnimating, setIsCardAnimating] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const { toast } = useToast();

  const currentChurch = churches[currentIndex];
  const isLastCard = currentIndex === churches.length - 1;

  // Check if it's the user's first visit and show instructions
  useEffect(() => {
    const hasSeenInstructions = localStorage.getItem('hasSeenSwipeInstructions');
    if (!hasSeenInstructions) {
      setShowInstructions(true);
      localStorage.setItem('hasSeenSwipeInstructions', 'true');
    }
  }, []);

  const handleSwipe = (direction: "left" | "right") => {
    setIsCardAnimating(true);
    
    // Record the match
    if (direction === "right") {
      setMatches(prev => ({
        ...prev,
        [currentChurch.id]: true
      }));
      
      // Show toast notification
      toast({
        title: "Church Saved!",
        description: `You've matched with ${currentChurch.name}.`,
        duration: 3000,
      });
    }

    // Move to the next card after animation completes
    setTimeout(() => {
      if (currentIndex < churches.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        // Reset if we've gone through all cards
        resetCards();
      }
      setIsCardAnimating(false);
    }, 300);
  };

  const resetCards = () => {
    // Shuffle the churches array for a different order
    const shuffled = [...initialChurches].sort(() => Math.random() - 0.5);
    setChurches(shuffled);
    setCurrentIndex(0);
    
    toast({
      title: "All churches viewed!",
      description: "We've reshuffled the deck for you.",
      duration: 3000,
    });
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-142px)]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Discover Churches</h1>
          <p className="text-muted-foreground">
            Swipe right on churches you're interested in
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          {churches.length > 0 ? (
            <div className="relative swipe-card-container">
              {currentChurch ? (
                <>
                  <ChurchCard
                    church={currentChurch}
                    onSwipe={handleSwipe}
                    onViewDetails={() => setShowDetails(true)}
                  />
                  <SwipeControls
                    onSwipeLeft={() => handleSwipe("left")}
                    onSwipeRight={() => handleSwipe("right")}
                    isAnimating={isCardAnimating}
                  />
                </>
              ) : (
                <div className="text-center">
                  <p>No more churches to display</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <ChurchIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <h3 className="text-lg font-medium">No Churches Found</h3>
              <p className="text-muted-foreground">
                There are no churches to display right now.
              </p>
            </div>
          )}
        </div>

        {currentChurch && (
          <ChurchDetails
            church={currentChurch}
            isOpen={showDetails}
            onClose={() => setShowDetails(false)}
          />
        )}

        <SwipeInstructions 
          isOpen={showInstructions}
          onClose={() => setShowInstructions(false)}
        />
      </div>
    </Layout>
  );
};

export default Discover;
