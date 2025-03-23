
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocationStore } from '../store/locationStore';
import { toast } from 'sonner';
import LoadingState from '../components/map/LoadingState';
import LocationImage from '../components/map/LocationImage';
import MapInfo from '../components/map/MapInfo';
import MapContainer from '../components/map/MapContainer';

const INDIA_CENTER = [20.5937, 78.9629];

const MapView = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchLocationById } = useLocationStore();

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
      // Use the location store to fetch
      const fetchLocation = async () => {
        setLoading(true);
        
        try {
          const locationData = await fetchLocationById(id);
          
          if (locationData) {
            setLocation(locationData);
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
            toast.warning("Location not found, showing default view");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          toast.error("Failed to load location data");
        } finally {
          setLoading(false);
        }
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
  }, [id, state, isAuthenticated, fetchLocationById]);

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

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className={`min-h-screen ${isFullscreen ? 'pt-0' : 'pt-16'} animated-background`}>
      {!isFullscreen && (
        <div className="container px-4 mx-auto py-4">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={handleBackToDashboard}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <LocationImage location={location} />
            <MapInfo location={location} onFullscreenToggle={toggleFullscreen} />
          </div>
        </div>
      )}
      
      {/* Map Section */}
      <MapContainer 
        location={location} 
        isFullscreen={isFullscreen} 
        toggleFullscreen={toggleFullscreen} 
        INDIA_CENTER={INDIA_CENTER} 
      />
    </div>
  );
};

export default MapView;
