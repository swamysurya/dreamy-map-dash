import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MapComponent from '../components/Map';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Maximize, Minimize, Navigation, Info, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationCardProps } from '../components/LocationCard';
import { cn } from '@/lib/utils';

// Mock locations data (same as in Dashboard)
const mockLocations: LocationCardProps[] = [
  {
    id: '1',
    name: 'New Delhi',
    description: 'The capital city of India, known for its rich history and cultural heritage.',
    latitude: 28.6139,
    longitude: 77.2090,
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Mumbai',
    description: 'The financial capital of India, home to Bollywood and bustling city life.',
    latitude: 19.0760,
    longitude: 72.8777,
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Bangalore',
    description: 'The Silicon Valley of India, known for its tech industry and pleasant climate.',
    latitude: 12.9716,
    longitude: 77.5946,
    imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Kolkata',
    description: 'The cultural capital of India, famous for its literature, art, and food.',
    latitude: 22.5726,
    longitude: 88.3639,
    imageUrl: 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Chennai',
    description: 'A major cultural and economic center in South India, known for its temples.',
    latitude: 13.0827,
    longitude: 80.2707,
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'Jaipur',
    description: 'The Pink City, known for its stunning palaces, forts and vibrant culture.',
    latitude: 26.9124,
    longitude: 75.7873,
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop'
  },
];

// India's default center
const INDIA_CENTER: [number, number] = [20.5937, 78.9629];

const MapView = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [location, setLocation] = useState<LocationCardProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Try to get location from router state first
    if (state && state.name && state.latitude && state.longitude) {
      setLocation({
        id: id || '0',
        name: state.name,
        description: state.description || 'No description available',
        latitude: state.latitude,
        longitude: state.longitude,
        imageUrl: state.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image',
      });
      setLoading(false);
      return;
    }

    // If not in state, fetch by ID
    if (id) {
      // Simulate API fetch
      const fetchLocation = async () => {
        setLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const foundLocation = mockLocations.find(loc => loc.id === id);
        
        if (foundLocation) {
          setLocation(foundLocation);
        } else {
          // If not found, use default India center
          setLocation({
            id: '0',
            name: 'India',
            description: 'Explore the diverse landscape and rich culture of India.',
            latitude: INDIA_CENTER[0],
            longitude: INDIA_CENTER[1],
            imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop',
          });
        }
        
        setLoading(false);
      };
      
      fetchLocation();
    } else {
      // Default to India view if no location specified
      setLocation({
        id: '0',
        name: 'India',
        description: 'Explore the diverse landscape and rich culture of India.',
        latitude: INDIA_CENTER[0],
        longitude: INDIA_CENTER[1],
        imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop',
      });
      setLoading(false);
    }
  }, [id, state, isAuthenticated]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center animated-background">
        <div className="animate-pulse-slow">
          <div className="w-16 h-16 mb-4 rounded-full bg-primary/20 mx-auto"></div>
          <div className="h-4 w-32 bg-primary/20 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isFullscreen ? 'pt-0' : 'pt-16'} animated-background`}>
      {!isFullscreen && (
        <div className="container px-4 mx-auto py-4">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate('/dashboard')}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            {/* Location Image */}
            <div className="sm:w-1/3">
              <div className="relative rounded-lg overflow-hidden h-48 sm:h-full">
                <img
                  src={location?.imageUrl}
                  alt={location?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex items-center mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">
                      {location?.latitude.toFixed(2)}, {location?.longitude.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location Info */}
            <div className="sm:w-2/3">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold">{location?.name}</h1>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFullscreen}
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
                  
                  <Button className="w-full mt-4" onClick={toggleFullscreen}>
                    <Maximize className="h-4 w-4 mr-2" />
                    View Full Screen Map
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
      
      {/* Map Section */}
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
    </div>
  );
};

export default MapView;
