
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAuthStore } from '../store/authStore';

// This hook provides backward compatibility
// with components that expect to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // If context is not available (which shouldn't happen),
  // fallback to directly accessing the store
  if (!context) {
    return useAuthStore();
  }
  
  return context;
};

export default useAuth;
