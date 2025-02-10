
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
  checkAdminRole: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkAdminRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        return false;
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
        return false;
      }
      
      setIsAdmin(data || false);
      return data || false;
    } catch (error) {
      console.error("Error in admin check:", error);
      setIsAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    const hasSupabaseSession = !!localStorage.getItem("sb-" + supabase.projectId + "-auth-token");
    
    if (hasSupabaseSession) {
      checkAdminRole();
    } else {
      setIsAdmin(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        await checkAdminRole();
      } else if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, isLoading, checkAdminRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
