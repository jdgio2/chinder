
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Church, MapPin, Heart, Users, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-132px)] justify-center px-4">
      <div className="max-w-md text-center">
        <Church className="h-16 w-16 mx-auto mb-4 text-church-purple" />
        <h1 className="text-3xl font-bold mb-2">
          Find Your Perfect Church Community
        </h1>
        <p className="text-gray-600 mb-8">
          Discover churches that match your spiritual preferences, worship style,
          and community needs with our unique matching system.
        </p>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-start mb-4">
              <MapPin className="h-6 w-6 text-church-blue mr-3 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-medium">Find Local Churches</h3>
                <p className="text-sm text-gray-600">
                  Discover churches near you based on your location and preferences
                </p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <Heart className="h-6 w-6 text-church-purple mr-3 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-medium">Personalized Matching</h3>
                <p className="text-sm text-gray-600">
                  Swipe right on churches you're interested in, swipe left to pass
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-6 w-6 text-church-teal mr-3 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-medium">Connect With Communities</h3>
                <p className="text-sm text-gray-600">
                  Keep track of churches you've visited and find your spiritual home
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full bg-church-purple hover:bg-church-purple/90"
              onClick={() => navigate("/onboarding")}
            >
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/discover")}
            >
              Skip to Discover
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
