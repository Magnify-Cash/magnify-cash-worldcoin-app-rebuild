
import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isWalletRoute = !isAdminRoute;
  const isWorldIDAuthorized = localStorage.getItem("ls_wallet_address");
  const hasSupabaseSession = !!localStorage.getItem("sb-" + supabase.projectId + "-auth-token");

  useEffect(() => {
    async function checkAdminRole() {
      try {
        // Only check admin role for admin routes or if there's a Supabase session
        if (isAdminRoute || hasSupabaseSession) {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            setIsAdmin(false);
            setIsLoading(false);
            return;
          }

          const { data, error } = await supabase.rpc('has_role', {
            role_to_check: 'admin'
          });
          
          if (error) {
            console.error("Error checking admin role:", error);
            toast({
              title: "Error",
              description: "Failed to verify admin permissions",
              variant: "destructive",
            });
            setIsAdmin(false);
          } else {
            setIsAdmin(data || false);
            // If trying to access admin route without admin role
            if (isAdminRoute && !data) {
              toast({
                title: "Access Denied",
                description: "You don't have permission to access this area",
                variant: "destructive",
              });
              setShouldRedirect(true);
            }
          }
        }
      } catch (error) {
        console.error("Error in admin check:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAdminRole();
  }, [toast, isAdminRoute, hasSupabaseSession]);

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
      return <Navigate to="/wallet" replace />;
    }
    
    // If not admin, redirect to login
    if (!isAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
    
    return <>{children}</>;
  }

  // Handle regular wallet routes
  if (isWalletRoute) {
    // If admin tries to access wallet routes
    if (isAdmin && !isWorldIDAuthorized) {
      toast({
        title: "Access Denied",
        description: "Please use WorldID to access user features",
        variant: "destructive",
      });
      return <Navigate to="/admin/create-announcement" replace />;
    }

    // If no WorldID auth, redirect to welcome
    if (!isWorldIDAuthorized) {
      return <Navigate to="/" replace />;
    }
  }

  if (shouldRedirect) {
    return <Navigate to="/announcements" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
