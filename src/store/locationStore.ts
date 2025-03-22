
import { create } from 'zustand';
import { LocationCardProps } from '../components/LocationCard';
import { locationsAPI } from '../services/mockApi';

interface LocationState {
  locations: LocationCardProps[];
  selectedLocation: LocationCardProps | null;
  isLoading: boolean;
  error: string | null;
  fetchLocations: () => Promise<void>;
  fetchLocationById: (id: string) => Promise<LocationCardProps | null>;
  filterLocationsByRegion: (region: 'all' | 'north' | 'south') => LocationCardProps[];
}

export const useLocationStore = create<LocationState>((set, get) => ({
  locations: [],
  selectedLocation: null,
  isLoading: false,
  error: null,
  
  fetchLocations: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const result = await locationsAPI.getAll();
      
      if (result.success && result.data) {
        set({ 
          locations: result.data,
          isLoading: false 
        });
      } else {
        set({ 
          error: result.error || 'Failed to fetch locations', 
          isLoading: false 
        });
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      set({ 
        error: 'Failed to fetch locations',
        isLoading: false 
      });
    }
  },
  
  fetchLocationById: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const result = await locationsAPI.getById(id);
      
      if (result.success && result.data) {
        set({ 
          selectedLocation: result.data,
          isLoading: false 
        });
        return result.data;
      } else {
        set({ 
          error: result.error || 'Location not found', 
          isLoading: false 
        });
        return null;
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      set({ 
        error: 'Failed to fetch location',
        isLoading: false 
      });
      return null;
    }
  },
  
  filterLocationsByRegion: (region: 'all' | 'north' | 'south') => {
    const { locations } = get();
    
    if (region === 'all') return locations;
    if (region === 'north') {
      return locations.filter(loc => loc.latitude > 23); // Rough boundary for North India
    }
    if (region === 'south') {
      return locations.filter(loc => loc.latitude <= 23); // Rough boundary for South India
    }
    return locations;
  }
}));
