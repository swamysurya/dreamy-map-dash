
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Menu, X, Map, LayoutDashboard, LogOut } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Map className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">MapDash</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link 
                to="/" 
                className={`transition-colors duration-200 hover:text-primary ${
                  location.pathname === '/dashboard' ? 'text-primary font-medium' : 'text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-gray-700 hover:text-red-500 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button className="bg-primary hover:bg-primary/90">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="block md:hidden text-gray-800" onClick={toggleMenu}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="block md:hidden glass animate-fade-in">
          <div className="container px-4 mx-auto py-4 flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className={`flex items-center py-2 px-4 rounded-md transition-colors ${
                    location.pathname === '/dashboard' 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-700 hover:bg-primary/5'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center py-2 px-4 rounded-md text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block py-2">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
