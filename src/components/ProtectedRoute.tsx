
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse-slow flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 mb-4"></div>
          <div className="h-2 w-24 bg-primary/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
