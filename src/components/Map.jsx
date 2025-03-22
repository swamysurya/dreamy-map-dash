
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cn } from '@/lib/utils';

// Fix for Leaflet marker icons
delete (L.Icon.Default.prototype)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const customIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to set the view based on props
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 1
    });
  }, [center, zoom, map]);
  
  return null;
};

const MapComponent = ({
  center,
  zoom = 5,
  locationName,
  className,
  showCurrentLocation = false,
}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Reduced loading time for better UX

    // Get user's current location if requested
    if (showCurrentLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([
            position.coords.latitude,
            position.coords.longitude
          ]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    return () => clearTimeout(timer);
  }, [showCurrentLocation, center]); // Added center as dependency to refresh on location change

  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm animate-fade-in">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700">Loading map...</p>
          </div>
        </div>
      )}
      
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <ChangeView center={center} zoom={zoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ZoomControl position="bottomright" />
        
        {/* Primary Location Marker */}
        <Marker position={center} icon={customIcon}>
          <Popup>
            <div className="p-1">
              <h3 className="font-semibold text-sm">{locationName || "Selected Location"}</h3>
              <p className="text-xs text-gray-600">
                {center[0].toFixed(4)}, {center[1].toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
        
        {/* Current Location Marker */}
        {currentLocation && (
          <Marker 
            position={currentLocation} 
            icon={L.divIcon({
              html: `<div class="h-4 w-4 bg-blue-500 rounded-full border-2 border-white shadow-lg pulse"></div>`,
              className: '',
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-semibold text-sm">Your Location</h3>
                <p className="text-xs text-gray-600">
                  {currentLocation[0].toFixed(4)}, {currentLocation[1].toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
