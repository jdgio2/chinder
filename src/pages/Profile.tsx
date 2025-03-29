
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Settings, 
  Bell, 
  MapPin, 
  Lock, 
  HelpCircle, 
  LogOut, 
  ChevronRight 
} from "lucide-react";
import { currentProfile } from "@/data/mockData";

const Profile = () => {
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
            <Button variant="outline" size="sm" className="ml-auto">
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
            
            <Button variant="destructive" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
