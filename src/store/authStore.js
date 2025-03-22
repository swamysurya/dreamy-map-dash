
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/mockApi';
import { toast } from "sonner";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (username, password) => {
        set({ isLoading: true });
        
        try {
          const result = await authAPI.login(username, password);
          
          if (result.success && result.data) {
            set({ 
              user: result.data, 
              isAuthenticated: true,
              isLoading: false
            });
            toast.success("Logged in successfully!");
            return true;
          } else {
            set({ isLoading: false });
            toast.error("Invalid credentials. Try username: user, password: password");
            return false;
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ isLoading: false });
          toast.error("Login failed. Please try again.");
          return false;
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
        toast.info("Logged out successfully");
      }
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // only persist these states
    }
  )
);
