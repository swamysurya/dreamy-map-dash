
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Maximize, Navigation, Info, MapPin } from 'lucide-react';

const MapInfo = ({ location, onFullscreenToggle }) => {
  return (
    <div className="sm:w-2/3">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{location?.name}</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={onFullscreenToggle}
          className="hidden sm:flex"
        >
          <Maximize className="h-4 w-4 mr-2" />
          Full Screen
        </Button>
      </div>
      <p className="text-gray-600 mb-4">{location?.description}</p>
      
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="glass">
          <TabsTrigger value="info" className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span>Information</span>
          </TabsTrigger>
          <TabsTrigger value="navigation" className="flex items-center gap-1">
            <Navigation className="h-4 w-4" />
            <span>Navigation</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="mt-4 p-4 glass rounded-lg animate-fade-in">
          <h3 className="font-medium mb-2">About {location?.name}</h3>
          <p className="text-sm text-gray-600 mb-3">
            Explore the detailed map of {location?.name}. Use the zoom controls to get a closer look at the geography and landmarks.
          </p>
          <div className="text-sm text-gray-700">
            <div className="flex justify-between py-2 border-b">
              <span>Latitude</span>
              <span className="font-medium">{location?.latitude.toFixed(4)}° N</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Longitude</span>
              <span className="font-medium">{location?.longitude.toFixed(4)}° E</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Region</span>
              <span className="font-medium">
                {location?.latitude > 23 ? 'North India' : 'South India'}
              </span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="navigation" className="mt-4 p-4 glass rounded-lg animate-fade-in">
          <h3 className="font-medium mb-2">Navigation Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <div className="mr-2 p-1 rounded-full bg-primary/10 text-primary">
                <Maximize className="h-3 w-3" />
              </div>
              <span>Use the +/- buttons to zoom in and out</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 p-1 rounded-full bg-primary/10 text-primary">
                <MapPin className="h-3 w-3" />
              </div>
              <span>Click on markers to see location details</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 p-1 rounded-full bg-primary/10 text-primary">
                <Navigation className="h-3 w-3" />
              </div>
              <span>Enable your browser location to see your position relative to this location</span>
            </li>
          </ul>
          
          <Button className="w-full mt-4" onClick={onFullscreenToggle}>
            <Maximize className="h-4 w-4 mr-2" />
            View Full Screen Map
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MapInfo;
