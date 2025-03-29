
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Church } from "@/types";
import { churches as allChurches } from "@/data/mockData";
import { 
  MapPin, 
  CalendarPlus, 
  Calendar, 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  FileEdit,
  Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import ChurchDetails from "@/components/ChurchDetails";

// Mock visit data (in a real app, this would come from the database)
const mockVisits = [
  {
    churchId: "1",
    visitDate: "2023-08-15",
    rating: 4,
    notes: "Great worship service, but parking was difficult. The pastor's message was very engaging.",
    didAlignExpectations: true
  },
  {
    churchId: "4",
    visitDate: "2023-09-02",
    rating: 5,
    notes: "Loved everything about this church! The community was welcoming and the worship was amazing.",
    didAlignExpectations: true
  }
];

interface VisitFormValues {
  churchId: string;
  visitDate: Date;
  rating: number;
  notes: string;
  didAlignExpectations: boolean;
}

const Visits = () => {
  const [visitDialogOpen, setVisitDialogOpen] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [selectedVisitIndex, setSelectedVisitIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailChurch, setDetailChurch] = useState<Church | null>(null);
  const { toast } = useToast();

  const form = useForm<VisitFormValues>({
    defaultValues: {
      churchId: "",
      visitDate: new Date(),
      rating: 0,
      notes: "",
      didAlignExpectations: true
    }
  });

  // Get churches that have been visited
  const visitedChurches = allChurches.filter(church => 
    mockVisits.some(visit => visit.churchId === church.id)
  );

  // Get churches that haven't been visited yet (for the "Log a Visit" dropdown)
  const nonVisitedChurches = allChurches.filter(church => 
    !mockVisits.some(visit => visit.churchId === church.id)
  );

  const handleLogVisit = (church?: Church) => {
    setSelectedChurch(church || null);
    setSelectedVisitIndex(null);
    
    form.reset({
      churchId: church?.id || "",
      visitDate: new Date(),
      rating: 0,
      notes: "",
      didAlignExpectations: true
    });
    
    setVisitDialogOpen(true);
  };

  const handleEditVisit = (visitIndex: number) => {
    const visit = mockVisits[visitIndex];
    const church = allChurches.find(c => c.id === visit.churchId);
    
    setSelectedChurch(church || null);
    setSelectedVisitIndex(visitIndex);
    
    form.reset({
      churchId: visit.churchId,
      visitDate: new Date(visit.visitDate),
      rating: visit.rating,
      notes: visit.notes,
      didAlignExpectations: visit.didAlignExpectations
    });
    
    setVisitDialogOpen(true);
  };

  const onSubmit = (data: VisitFormValues) => {
    console.log("Form data:", data);
    
    toast({
      title: selectedVisitIndex !== null ? "Visit Updated" : "Visit Logged",
      description: `Your visit to ${selectedChurch?.name} has been ${selectedVisitIndex !== null ? 'updated' : 'recorded'}.`,
      duration: 3000,
    });
    
    setVisitDialogOpen(false);
  };

  const handleViewChurchDetails = (church: Church) => {
    setDetailChurch(church);
    setShowDetails(true);
  };

  // Render stars for ratings
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-church-gold fill-church-gold' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Your Church Visits</h1>
            <p className="text-muted-foreground">
              Track and rate churches you've visited
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <CalendarPlus className="h-4 w-4 mr-2" />
                Log a Visit
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-2">
                <h3 className="font-medium">Choose a church</h3>
                {nonVisitedChurches.length > 0 ? (
                  <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
                    {nonVisitedChurches.map(church => (
                      <button
                        key={church.id}
                        className="w-full text-left px-2 py-2 hover:bg-muted rounded-md flex items-center"
                        onClick={() => handleLogVisit(church)}
                      >
                        <div className="w-8 h-8 rounded-full bg-church-purple/10 flex items-center justify-center mr-2 flex-shrink-0">
                          <MapPin className="h-4 w-4 text-church-purple" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{church.name}</p>
                          <p className="text-xs text-muted-foreground">{church.address.split(',')[0]}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-2">
                    You've logged visits for all churches in your area.
                  </p>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleLogVisit()}
                >
                  Enter a different church
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {visitedChurches.length > 0 ? (
          <div className="space-y-4">
            {mockVisits.map((visit, index) => {
              const church = allChurches.find(c => c.id === visit.churchId);
              if (!church) return null;
              
              return (
                <div 
                  key={`${visit.churchId}-${visit.visitDate}`} 
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-border"
                >
                  <div className="flex items-center p-4 border-b border-border">
                    <div className="flex-1">
                      <h3 className="font-bold">{church.name}</h3>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Visited on {format(new Date(visit.visitDate), 'MMMM d, yyyy')}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditVisit(index)}
                      >
                        <FileEdit className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        {renderStars(visit.rating)}
                      </div>
                      <div>
                        {visit.didAlignExpectations ? (
                          <div className="flex items-center text-green-600 text-sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>Met expectations</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-amber-600 text-sm">
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            <span>Different than expected</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {visit.notes && (
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p>{visit.notes}</p>
                      </div>
                    )}
                    
                    <div className="flex space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewChurchDetails(church)}
                      >
                        View Church
                      </Button>
                      {church.websiteUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(church.websiteUrl, '_blank')}
                        >
                          Visit Website
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="text-lg font-medium">No visits logged yet</h3>
            <p className="text-muted-foreground mb-4">
              Keep track of churches you've visited and your experiences
            </p>
            <Button 
              className="bg-church-purple hover:bg-church-purple/90"
              onClick={() => handleLogVisit()}
            >
              Log Your First Visit
            </Button>
          </div>
        )}

        {/* Log Visit Dialog */}
        <Dialog open={visitDialogOpen} onOpenChange={setVisitDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedVisitIndex !== null ? "Edit Visit" : "Log a Church Visit"}
              </DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Church Selection (only if not editing) */}
                {!selectedChurch && (
                  <FormField
                    control={form.control}
                    name="churchId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Church</FormLabel>
                        <FormControl>
                          <select
                            className="w-full p-2 border border-input rounded-md"
                            {...field}
                          >
                            <option value="">Select a church...</option>
                            {allChurches.map(church => (
                              <option key={church.id} value={church.id}>
                                {church.name}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Visit Date */}
                <FormField
                  control={form.control}
                  name="visitDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Visit Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Rating */}
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => field.onChange(rating)}
                              className="focus:outline-none"
                            >
                              <Star 
                                className={`h-6 w-6 ${
                                  rating <= field.value 
                                    ? 'text-church-gold fill-church-gold' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Expectations */}
                <FormField
                  control={form.control}
                  name="didAlignExpectations"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Did the church meet your expectations?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => field.onChange(value === "true")}
                          defaultValue={field.value ? "true" : "false"}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="expectation-yes" />
                            <label htmlFor="expectation-yes" className="text-sm">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="expectation-no" />
                            <label htmlFor="expectation-no" className="text-sm">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your thoughts about your visit..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => setVisitDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {selectedVisitIndex !== null ? "Update Visit" : "Save Visit"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Church Details Dialog */}
        {detailChurch && (
          <ChurchDetails
            church={detailChurch}
            isOpen={showDetails}
            onClose={() => setShowDetails(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Visits;
