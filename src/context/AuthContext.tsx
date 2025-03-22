import React, { createContext, useContext } from 'react';
import { useAuthStore } from '../store/authStore';

// We'll keep this context for backward compatibility
// but it will just proxy to the Zustand store
export const AuthContext = createContext<ReturnType<typeof useAuthStore.getState> | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get the current state and actions from the store
  const authState = useAuthStore();
  
  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
