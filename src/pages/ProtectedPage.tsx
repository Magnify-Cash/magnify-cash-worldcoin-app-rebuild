
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
  const isAuthorized = localStorage.getItem("ls_wallet_address");

  useEffect(() => {
    async function checkAdminRole() {
      try {
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
            description: "Failed to verify admin permissions. Please try again.",
            variant: "destructive",
          });
          setIsAdmin(false);
        } else {
          setIsAdmin(data || false);
          if (isAdminRoute && !data) {
            toast({
              title: "Access Denied",
              description: "You don't have permission to access this area",
              variant: "destructive",
            });
            setShouldRedirect(true);
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
  }, [toast, isAdminRoute]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Handle admin routes
  if (isAdminRoute) {
    if (!isAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
    return <>{children}</>;
  }

  // Handle regular wallet routes
  if (isWalletRoute && !isAuthorized) {
    return <Navigate to="/" replace />;
  }

  if (shouldRedirect) {
    return <Navigate to="/announcements" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
