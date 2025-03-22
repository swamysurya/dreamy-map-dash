
import api from './api';
import { toast } from "sonner";
import { LocationCardProps } from '../components/LocationCard';

// Mock locations data
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

// Mock user data
const mockUsers = [
  { 
    id: '1',
    username: 'user', 
    password: 'password',
    token: 'mock-jwt-token-123456'
  }
];

// Add delay to simulate real API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ----- Mock API functions -----

// Auth API
export const authAPI = {
  login: async (username: string, password: string) => {
    try {
      // Simulate API call
      await delay(1000);
      
      // In a real app, this would be an actual API call:
      // const response = await api.post('/auth/login', { username, password });
      
      const user = mockUsers.find(
        u => u.username === username && u.password === password
      );
      
      if (user) {
        return { success: true, data: { id: user.id, username: user.username, token: user.token } };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }
};

// Locations API
export const locationsAPI = {
  getAll: async () => {
    try {
      // Simulate API call
      await delay(1000);
      
      // In a real app, this would be an actual API call:
      // const response = await api.get('/locations');
      // return { success: true, data: response.data };
      
      return { success: true, data: mockLocations };
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast.error("Failed to fetch locations");
      return { success: false, error: 'Failed to fetch locations' };
    }
  },
  
  getById: async (id: string) => {
    try {
      // Simulate API call
      await delay(800);
      
      // In a real app, this would be an actual API call:
      // const response = await api.get(`/locations/${id}`);
      // return { success: true, data: response.data };
      
      const location = mockLocations.find(loc => loc.id === id);
      if (location) {
        return { success: true, data: location };
      } else {
        return { success: false, error: 'Location not found' };
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      toast.error("Failed to fetch location details");
      return { success: false, error: 'Failed to fetch location' };
    }
  }
};

export default {
  auth: authAPI,
  locations: locationsAPI
};
