
import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ProtectedRoute = ({ children }) => {
  const isAuthorized = localStorage.getItem("ls_wallet_address");
  const location = useLocation();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    async function checkAdminRole() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
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
          }
        }
      } catch (error) {
        console.error("Error in admin check:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }

    if (isAuthorized) {
      checkAdminRole();
    } else {
      setIsLoading(false);
    }
  }, [isAuthorized, toast, isAdminRoute]);

  useEffect(() => {
    if (!isLoading && isAdminRoute && !isAdmin) {
      setShouldRedirect(true);
    }
  }, [isLoading, isAdminRoute, isAdmin]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  if (shouldRedirect) {
    return <Navigate to="/announcements" replace />;
  }

  return children;
};

export default ProtectedRoute;
