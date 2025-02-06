import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MiniAppWalletAuthPayload, MiniAppWalletAuthErrorPayload } from "@/types/wallet";

const Welcome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuthSuccess = async (payload: MiniAppWalletAuthPayload | MiniAppWalletAuthErrorPayload) => {
    if ('error' in payload) {
      console.error('Auth error:', payload.error);
      return;
    }
    
    // Access wallet address safely after checking for error
    const walletAddress = 'wallet' in payload ? payload.wallet : undefined;
    if (walletAddress) {
      localStorage.setItem("ls_wallet_address", walletAddress);
      localStorage.setItem("ls_username", walletAddress.slice(0, 8));
      navigate("/wallet");
    }
  };

  useEffect(() => {
    // Simulate wallet authentication
    const simulateAuth = async () => {
      const payload: MiniAppWalletAuthPayload = { wallet: "0x1234567890abcdef1234567890abcdef12345678" }; // Example payload
      handleAuthSuccess(payload);
    };

    simulateAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to the App</h1>
      <Button onClick={() => navigate("/login")} className="mt-4">
        Login
      </Button>
    </div>
  );
};

export default Welcome;
