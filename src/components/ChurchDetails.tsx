
import React from "react";
import { Church } from "@/types";
import { 
  MapPin, 
  Globe, 
  Clock, 
  Video, 
  User, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Smartphone,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ChurchDetailsProps {
  church: Church;
  isOpen: boolean;
  onClose: () => void;
}

const ChurchDetails: React.FC<ChurchDetailsProps> = ({ church, isOpen, onClose }) => {
  const mainImage = church.images[0];
  
  // Social media icons mapping
  const socialIcons: { [key: string]: React.ReactNode } = {
    facebook: <Facebook className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center mb-2">
          <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <DialogTitle className="text-xl">{church.name}</DialogTitle>
        </div>
        
        <div className="space-y-6">
          <div 
            className="h-48 w-full bg-cover bg-center rounded-md"
            style={{ backgroundImage: `url(${mainImage})` }}
          ></div>
          
          <div className="space-y-4">
            <p className="text-gray-700">{church.description}</p>
            
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-700">{church.address}</p>
                <p className="text-sm text-church-blue">
                  {church.distance} miles away
                </p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(church.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-church-purple hover:underline"
                >
                  Open in Maps
                </a>
              </div>
            </div>
            
            {church.websiteUrl && (
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <a 
                  href={church.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-church-purple hover:underline"
                >
                  Visit Website
                </a>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">Service Times</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(church.serviceTimes).map(([day, times]) => (
                  <div key={day} className="flex flex-col">
                    <span className="font-medium">{day}</span>
                    <span className="text-sm text-gray-600">{times.join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">About</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Denomination</span>
                  <span>{church.denomination}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Size</span>
                  <span>{church.sizeCategory}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Worship Style</span>
                  <span>{church.worshipStyle}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Service Style</span>
                  <span>{church.serviceFormality}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="text-sm text-gray-500">Focus Areas</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {church.emphasis.map((item) => (
                    <span key={item} className="px-2 py-1 bg-blue-100 text-church-blue rounded-full text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {church.pastorIntro && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium mb-2">Leadership</h3>
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{church.pastorIntro}</p>
                </div>
              </div>
            )}
            
            {church.socialMediaLinks && Object.keys(church.socialMediaLinks).length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium mb-2">Connect</h3>
                <div className="flex space-x-4">
                  {Object.entries(church.socialMediaLinks).map(([platform, url]) => (
                    socialIcons[platform] ? (
                      <a 
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-church-purple"
                      >
                        {socialIcons[platform]}
                      </a>
                    ) : (
                      <a 
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-church-purple"
                      >
                        <Smartphone className="h-5 w-5" />
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
            
            {church.sermonUrl && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium mb-2">Sermons</h3>
                <div className="flex items-center space-x-3">
                  <Video className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <a 
                    href={church.sermonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-church-purple hover:underline"
                  >
                    Watch Sermons
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChurchDetails;
