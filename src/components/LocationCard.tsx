
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export interface LocationCardProps {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
}

const LocationCard = ({
  id,
  name,
  description,
  latitude,
  longitude,
  imageUrl,
}: LocationCardProps) => {
  const navigate = useNavigate();

  const handleViewMap = () => {
    navigate(`/map/${id}`, { 
      state: { 
        name, 
        latitude, 
        longitude 
      } 
    });
  };

  return (
    <Card className="glass overflow-hidden card-hover border-0 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-3 left-3 flex items-center text-white">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{latitude.toFixed(2)}, {longitude.toFixed(2)}</span>
        </div>
      </div>
      
      <CardContent className="flex-grow p-5">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="bg-primary/10 text-primary p-1 rounded-full">
            <Navigation className="h-4 w-4" />
          </div>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button 
          className="w-full group" 
          onClick={handleViewMap}
        >
          View on Map
          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocationCard;
