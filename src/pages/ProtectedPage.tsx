
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const { isAdmin, isLoading } = useAuth();
  
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isWalletRoute = !isAdminRoute;
  const isWorldIDAuthorized = localStorage.getItem("ls_wallet_address");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Handle admin routes
  if (isAdminRoute) {
    // If WorldID user tries to access admin route
    if (isWorldIDAuthorized && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "WorldID users cannot access admin areas",
        variant: "destructive",
      });
      return <Navigate to="/announcements" replace />;
    }
    
    // If not admin, redirect to login
    if (!isAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
    
    return <>{children}</>;
  }

  // Handle regular wallet routes
  if (isWalletRoute) {
    // If admin tries to access wallet routes without WorldID
    if (isAdmin && !isWorldIDAuthorized) {
      toast({
        title: "Access Denied",
        description: "Please verify with WorldID first",
        variant: "destructive",
      });
      return <Navigate to="/" replace />;
    }

    // If no WorldID auth, redirect to welcome
    if (!isWorldIDAuthorized) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
