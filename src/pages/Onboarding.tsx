
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, MapPin, User, Church } from "lucide-react";
import { questionnaireData } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: {
      latitude: 0,
      longitude: 0,
      permissionGranted: false,
      displayAddress: ""
    },
    preferences: {} as Record<string, any>
  });
  const { toast } = useToast();

  const steps = [
    { title: "Personal Info", description: "Let's start with some basic information" },
    { title: "Location", description: "Help us find churches near you" },
    ...questionnaireData.sections.map(section => ({
      title: section.title,
      description: "Tell us about your preferences"
    }))
  ];

  const validatePersonalInfo = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (parseInt(formData.age) <= 0) {
      newErrors.age = "Age must be a positive number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "age" && value !== "") {
      // Only allow positive numbers for age
      const numValue = parseInt(value);
      if (numValue <= 0) return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (id: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = prev.preferences[id] || [];
      const newValues = checked 
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
      
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          [id]: newValues
        }
      };
    });
  };

  const handleRadioChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [id]: value
      }
    }));
  };

  const handleSliderChange = (id: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [id]: value[0]
      }
    }));
  };

  const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      // Format the address to show city, state/region and country
      let displayAddress = "";
      if (data.address) {
        const { city, town, village, county, state, country } = data.address;
        const locality = city || town || village || county || "";
        displayAddress = locality 
          ? `${locality}, ${state || ""} ${country || ""}` 
          : `${state || ""} ${country || ""}`;
      }
      
      return displayAddress.trim();
    } catch (error) {
      console.error("Error getting address:", error);
      return "";
    }
  };

  const requestLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          // Get address from coordinates
          const displayAddress = await getAddressFromCoordinates(latitude, longitude);
          
          setFormData(prev => ({
            ...prev,
            location: {
              latitude,
              longitude,
              permissionGranted: true,
              displayAddress
            }
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please try again.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const handleNext = () => {
    if (step === 0) {
      // Validate personal info before proceeding
      if (!validatePersonalInfo()) {
        return;
      }
    }
    
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      // Submit form data and navigate to discover page
      toast({
        title: "Onboarding Complete!",
        description: "Your profile has been set up. Let's find your church match!",
      });
      navigate("/discover");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    } else {
      navigate("/");
    }
  };

  const renderStepContent = () => {
    if (step === 0) {
      // Personal info step
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="John Doe"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Your Age</Label>
            <Input 
              id="age" 
              name="age" 
              type="number" 
              min="1"
              value={formData.age} 
              onChange={handleInputChange} 
              placeholder="30"
              className={errors.age ? "border-red-500" : ""}
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age}</p>
            )}
          </div>
        </div>
      );
    } else if (step === 1) {
      // Location step
      return (
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <MapPin className="h-16 w-16 text-church-purple" />
          </div>
          
          {formData.location.permissionGranted ? (
            <div className="text-center">
              <div className="bg-green-100 text-green-700 rounded-md p-3 mb-4">
                <p className="font-medium">Location access granted</p>
                <p className="text-sm">
                  We'll use this to find churches near you.
                </p>
              </div>
              
              {formData.location.displayAddress ? (
                <p className="font-medium text-muted-foreground">
                  Your location: {formData.location.displayAddress}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Coordinates: {formData.location.latitude.toFixed(6)}, {formData.location.longitude.toFixed(6)}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p>
                To find churches near you, please allow access to your location.
              </p>
              <Button 
                onClick={requestLocation}
                className="bg-church-purple hover:bg-church-purple/90"
              >
                Share My Location
              </Button>
              <p className="text-xs text-muted-foreground">
                We only use your location to find nearby churches. Your privacy is important to us.
              </p>
            </div>
          )}
        </div>
      );
    } else {
      // Questionnaire steps
      const sectionIndex = step - 2;
      const section = questionnaireData.sections[sectionIndex];
      
      return (
        <div className="space-y-6">
          {section.questions.map(question => (
            <div key={question.id} className="space-y-3">
              <Label>{question.question}</Label>
              
              {question.type === "multiple" && question.options && (
                <div className="space-y-2">
                  {question.options.map(option => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${question.id}-${option}`}
                        checked={(formData.preferences[question.id] || []).includes(option)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(question.id, option, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={`${question.id}-${option}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              {question.type === "single" && question.options && (
                <RadioGroup
                  value={formData.preferences[question.id] || ""}
                  onValueChange={(value) => handleRadioChange(question.id, value)}
                >
                  <div className="space-y-2">
                    {question.options.map(option => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                        <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}
              
              {question.type === "slider" && (
                <div className="space-y-4">
                  <Slider
                    defaultValue={[question.min || 1]}
                    min={question.min || 1}
                    max={question.max || 5}
                    step={question.step || 1}
                    onValueChange={(value) => handleSliderChange(question.id, value)}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Min: {question.min || 1}</span>
                    <span>Max: {question.max || 5}</span>
                  </div>
                  {formData.preferences[question.id] && (
                    <p className="text-center font-medium">
                      Selected: {formData.preferences[question.id]}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
  };

  const currentStep = steps[step];

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">
              Step {step + 1} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((step + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-church-purple rounded-full transition-all"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-church-purple hover:bg-church-purple/90"
            disabled={step === 1 && !formData.location.permissionGranted}
          >
            {step < steps.length - 1 ? "Next" : "Finish"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Onboarding;
