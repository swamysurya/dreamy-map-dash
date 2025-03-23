
import { MapPin } from 'lucide-react';

const LocationImage = ({ location }) => {
  return (
    <div className="sm:w-1/3">
      <div className="relative rounded-lg overflow-hidden h-48 sm:h-full">
        {location?.imageUrl && (
          <img
            src={location.imageUrl}
            alt={location?.name || "Location"}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image';
            }}
          />
        )}
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
  );
};

export default LocationImage;
