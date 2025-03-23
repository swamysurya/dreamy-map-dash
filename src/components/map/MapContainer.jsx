
import { cn } from '@/lib/utils';
import { Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MapComponent from '../Map';

const MapContainer = ({ location, isFullscreen, toggleFullscreen, INDIA_CENTER }) => {
  return (
    <div 
      className={cn(
        "container mx-auto px-4 pb-6", 
        isFullscreen ? "h-screen p-0" : "h-[500px]"
      )}
    >
      <div className="relative h-full">
        <MapComponent 
          center={[location?.latitude || INDIA_CENTER[0], location?.longitude || INDIA_CENTER[1]]}
          zoom={isFullscreen ? 6 : 5}
          locationName={location?.name}
          className="h-full glass"
          showCurrentLocation={true}
        />
        
        {isFullscreen && (
          <div className="absolute top-4 right-4 z-[1000]">
            <Button 
              onClick={toggleFullscreen}
              className="glass bg-white text-gray-800 hover:bg-white/90"
            >
              <Minimize className="h-4 w-4 mr-2" />
              Exit Full Screen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapContainer;
