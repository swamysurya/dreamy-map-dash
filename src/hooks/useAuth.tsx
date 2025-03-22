
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAuthStore } from '../store/authStore';

// This hook allows us to maintain backward compatibility
// while transitioning to Zustand
export const useAuth = () => {
  // For components that expect the old context
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Return the context (which now just proxies to the Zustand store)
  return context;
};

// For new components, you can directly use:
// import { useAuthStore } from '../store/authStore';
