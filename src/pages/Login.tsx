
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Lock, User } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(username, password);
    
    setIsLoading(false);
    if (success) {
      navigate("/dashboard");
    }
  };

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col animated-background">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-scale-in">
          <Card className="glass border-0 overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-6">
                <div className="rounded-full h-16 w-16 flex items-center justify-center bg-primary/10 text-primary animate-float">
                  <Map className="h-8 w-8" />
                </div>
              </div>
              <CardTitle className="text-2xl font-medium text-center">Welcome to MapDash</CardTitle>
              <CardDescription className="text-center mt-2">
                Sign in to access your dashboard and maps
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <User className="h-4 w-4" />
                    </div>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-center border-t bg-gray-50/50 px-8 py-4">
              <p className="text-sm text-gray-600">
                Demo credentials: username: "user", password: "password"
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MapDash. Premium mapping experience.
      </footer>
    </div>
  );
};

export default Login;
