
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  User, 
  Settings, 
  Bell, 
  MapPin, 
  Lock, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Save
} from "lucide-react";
import { currentProfile } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditPreferences, setShowEditPreferences] = useState(false);
  
  // Profile edit state
  const [profileForm, setProfileForm] = useState({
    name: currentProfile.name,
    age: currentProfile.age
  });
  
  // Church preferences edit state
  const [preferencesForm, setPreferencesForm] = useState({
    maxDistance: currentProfile.preferences.maxDistance,
    serviceFormality: currentProfile.preferences.serviceFormality,
    sizePreference: currentProfile.preferences.sizePreference
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || '' : value
    }));
  };

  const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferencesForm(prev => ({
      ...prev,
      [name]: name === 'maxDistance' ? parseInt(value) || 5 : value
    }));
  };

  const handleSaveProfile = () => {
    // Here you would save the profile data to your database
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setShowEditProfile(false);
  };

  const handleSavePreferences = () => {
    // Here you would save the preferences to your database
    toast({
      title: "Preferences Updated",
      description: "Your church preferences have been successfully updated.",
    });
    setShowEditPreferences(false);
  };

  const handleSignOut = () => {
    // Here you would sign out the user
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    
    // Navigate to the landing page
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
          <div className="p-6 flex items-center">
            <div className="w-16 h-16 rounded-full bg-church-purple/10 flex items-center justify-center mr-4">
              <User className="h-8 w-8 text-church-purple" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{currentProfile.name}</h2>
              <p className="text-muted-foreground">Age: {currentProfile.age}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-auto"
              onClick={() => setShowEditProfile(true)}
            >
              Edit
            </Button>
          </div>

          <Separator />

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Church Preferences</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Worship Styles</h4>
                    <div className="space-y-1">
                      {Object.entries(currentProfile.preferences.worshipStyle)
                        .sort((a, b) => b[1] - a[1])
                        .map(([style, weight]) => (
                          <div key={style} className="flex justify-between items-center">
                            <span className="text-sm">{style}</span>
                            <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-church-purple"
                                style={{ width: `${weight * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Denomination Preferences</h4>
                    <div className="space-y-1">
                      {Object.entries(currentProfile.preferences.denominationWeights)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 4)
                        .map(([denom, weight]) => (
                          <div key={denom} className="flex justify-between items-center">
                            <span className="text-sm">{denom}</span>
                            <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-church-purple"
                                style={{ width: `${weight * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Church Size Preference</h4>
                  <div className="bg-purple-100 text-church-purple px-3 py-1 rounded-full text-sm inline-block">
                    {currentProfile.preferences.sizePreference}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(currentProfile.preferences.emphasisWeights)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([emphasis, weight]) => (
                        <div 
                          key={emphasis}
                          className="px-3 py-1 bg-blue-100 text-church-blue rounded-full text-sm"
                        >
                          {emphasis}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Service Style</h4>
                  <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm inline-block">
                    {currentProfile.preferences.serviceFormality}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Distance Preference</h4>
                  <p className="text-sm">Within {currentProfile.preferences.maxDistance} miles</p>
                </div>

                <Button
                  className="w-full bg-church-purple hover:bg-church-purple/90 mt-2"
                  onClick={() => setShowEditPreferences(true)}
                >
                  Update Church Preferences
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Settings</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <Label htmlFor="notifications">Notifications</Label>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <Label htmlFor="location">Location Services</Label>
                  </div>
                  <Switch id="location" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-1">
                <button className="w-full flex items-center justify-between p-2 hover:bg-muted rounded-md">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-gray-500" />
                    <span>Privacy Settings</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </button>
                
                <button className="w-full flex items-center justify-between p-2 hover:bg-muted rounded-md">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-gray-500" />
                    <span>Help & Support</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </button>
                
                <button className="w-full flex items-center justify-between p-2 hover:bg-muted rounded-md">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-gray-500" />
                    <span>App Settings</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <Separator />
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input 
                id="edit-name" 
                name="name" 
                value={profileForm.name} 
                onChange={handleProfileChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-age">Age</Label>
              <Input 
                id="edit-age" 
                name="age" 
                type="number" 
                min="1"
                value={profileForm.age} 
                onChange={handleProfileChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowEditProfile(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Church Preferences Dialog */}
      <Dialog open={showEditPreferences} onOpenChange={setShowEditPreferences}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Church Preferences</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="maxDistance">Maximum Distance (miles)</Label>
              <Input 
                id="maxDistance" 
                name="maxDistance" 
                type="number" 
                min="1"
                max="100"
                value={preferencesForm.maxDistance} 
                onChange={handlePreferencesChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceFormality">Service Style</Label>
              <select 
                id="serviceFormality"
                name="serviceFormality"
                value={preferencesForm.serviceFormality}
                onChange={handlePreferencesChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Casual">Casual</option>
                <option value="Formal">Formal</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sizePreference">Church Size</Label>
              <select 
                id="sizePreference"
                name="sizePreference"
                value={preferencesForm.sizePreference}
                onChange={handlePreferencesChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Megachurch">Megachurch</option>
              </select>
            </div>
            <p className="text-sm text-muted-foreground">
              For more detailed preferences like denomination and worship style, please complete the onboarding questionnaire again.
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowEditPreferences(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Profile;
