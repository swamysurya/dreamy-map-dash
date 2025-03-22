
import React, { createContext, useState, useEffect } from 'react';
import { toast } from "sonner";

type User = {
  id: string;
  username: string;
  token: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

// Mock API response - this would typically come from a backend
const mockLogin = async (username: string, password: string): Promise<User | null> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple validation
  if (username.trim() && password === 'password') {
    return {
      id: '1',
      username,
      token: 'mock-jwt-token',
    };
  }
  
  return null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const user = await mockLogin(username, password);
      
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success("Logged in successfully!");
        return true;
      } else {
        toast.error("Invalid credentials. Try username: any, password: password");
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading,
        login, 
        logout,
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
