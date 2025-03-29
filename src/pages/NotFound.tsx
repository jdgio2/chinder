
import React from "react";
import { Button } from "@/components/ui/button";
import { Church, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <Church className="h-20 w-20 mx-auto mb-6 text-church-purple opacity-50" />
        <h1 className="text-6xl font-bold text-church-purple mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Button 
          className="bg-church-purple hover:bg-church-purple/90"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
