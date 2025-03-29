
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Church } from "@/types";
import { churches as allChurches } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MapPin, 
  Clock, 
  Heart, 
  X, 
  ExternalLink, 
  AlertTriangle 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ChurchDetails from "@/components/ChurchDetails";
import { useToast } from "@/hooks/use-toast";

// Mock saved churches (in a real app, this would come from the database)
const mockSavedIds = ["1", "4", "5"];

const Saved = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(mockSavedIds);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [churchToDelete, setChurchToDelete] = useState<Church | null>(null);
  const { toast } = useToast();

  // Filter churches that the user has saved (swiped right on)
  const savedChurches = allChurches.filter(church => savedIds.includes(church.id));
  
  // Filter based on search term
  const filteredChurches = searchTerm
    ? savedChurches.filter(church => 
        church.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        church.denomination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        church.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : savedChurches;

  const handleViewDetails = (church: Church) => {
    setSelectedChurch(church);
    setShowDetails(true);
  };

  const handleRemoveChurch = (church: Church) => {
    setChurchToDelete(church);
    setShowDeleteDialog(true);
  };

  const confirmRemoveChurch = () => {
    if (!churchToDelete) return;
    
    // Remove the church from saved list
    setSavedIds(prev => prev.filter(id => id !== churchToDelete.id));
    
    toast({
      title: "Church Removed",
      description: `${churchToDelete.name} has been removed from your saved churches.`,
    });
    
    setShowDeleteDialog(false);
    setChurchToDelete(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Saved Churches</h1>
          <p className="text-muted-foreground">
            Churches you've shown interest in
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, denomination, or location"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredChurches.length > 0 ? (
          <div className="space-y-4">
            {filteredChurches.map(church => (
              <div 
                key={church.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-border"
              >
                <div 
                  className="h-32 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${church.images[0]})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-3 text-white">
                      <h2 className="font-bold text-lg">{church.name}</h2>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{church.distance} miles away</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 space-y-3">
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Next Service</p>
                      <p className="text-xs text-gray-600">
                        Sunday, {Object.values(church.serviceTimes)[0][0]}
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
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewDetails(church)}
                    >
                      View Details
                    </Button>
                    {church.websiteUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(church.websiteUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveChurch(church)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <Heart className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            {searchTerm ? (
              <>
                <h3 className="text-lg font-medium">No matches found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search term
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium">No saved churches yet</h3>
                <p className="text-muted-foreground mb-4">
                  Swipe right on churches you're interested in to save them here
                </p>
                <Button 
                  className="bg-church-purple hover:bg-church-purple/90"
                  onClick={() => window.location.href = '/discover'}
                >
                  Discover Churches
                </Button>
              </>
            )}
          </div>
        )}

        {selectedChurch && (
          <ChurchDetails
            church={selectedChurch}
            isOpen={showDetails}
            onClose={() => setShowDetails(false)}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                Remove Saved Church
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove {churchToDelete?.name} from your saved churches?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmRemoveChurch}
                className="bg-red-500 hover:bg-red-600"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Saved;
