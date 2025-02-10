
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
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    async function checkAdminRole() {
      try {
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
  }, [isAuthorized, toast]);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  if (isAdminRoute && !isAdmin) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this area",
      variant: "destructive",
    });
    return <Navigate to="/announcements" replace />;
  }

  return children;
};

export default ProtectedRoute;
