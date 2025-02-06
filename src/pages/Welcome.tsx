import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MiniKit } from "@worldcoin/minikit-js";
import { ArrowRight, Shield, TestTubes } from "lucide-react";
import { toast } from "sonner";

const Welcome = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Check if the sign-in conditions are met
  const isSignInReady = () => {
    return (
      MiniKit.user && // Ensure MiniKit.user is available
      walletAddress &&
      username
    );
  };

  const handleSignIn = async () => {
    const wallet_address = localStorage.getItem("ls_wallet_address");
    const username = localStorage.getItem("ls_username");
    if (username && wallet_address) {
      navigate("/wallet");
      return;
    }
    try {
      console.log("Initiating wallet authentication...");
      const nonce = crypto.randomUUID().replace(/-/g, "");
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce,
        statement: "Sign in to Magnify Cash to manage your loans.",
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      });

      if (finalPayload && finalPayload.address) {
        setWalletAddress(finalPayload.address); // Store wallet address in state
        localStorage.setItem("ls_wallet_address", finalPayload.address);
        toast.success("Successfully signed in!");
        navigate("/wallet");
      } else {
        toast.error("Failed to retrieve wallet address.");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Failed to sign in. Please try again.");
    }
  };

  const handleMockSignIn = () => {
    const mockAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
    const mockUsername = "test_user";
    localStorage.setItem("ls_wallet_address", mockAddress);
    localStorage.setItem("ls_username", mockUsername);
    setWalletAddress(mockAddress);
    setUsername(mockUsername);
    toast.success("Successfully signed in with mock credentials!");
    navigate("/wallet");
  };

  // Watch for updates to MiniKit.user and handle username assignment
  useEffect(() => {
    const user = MiniKit.user;
    if (user) {
      setUsername(user.username);
      localStorage.setItem("ls_username", user.username);
    }
  }, [MiniKit.user]);

  // UseEffect to trigger navigation once the sign-in conditions are met
  useEffect(() => {
    if (isSignInReady()) {
      navigate("/wallet");
    }
  }, [walletAddress, username, navigate]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/f590c0ed-415e-4ed0-8f6b-631288f14028.png"
            alt="Magnify Cash Logo"
            className="w-8 h-8 rounded-[20%]"
          />
          <div className="text-gray-900 text-2xl font-medium">Magnify Cash</div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#2DFFF9] to-[#FF7777] text-transparent bg-clip-text animate-gradient">
            Unlock Your Digital Identity's Value
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto font-medium">
            Get instant loans backed by your World ID. No collateral needed, just your verified digital
            presence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={handleSignIn}
              className="glass-button flex items-center justify-center gap-2 bg-gradient-to-r from-[#2DFFF9] to-[#FF7777] hover:shadow-lg"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              disabled
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-gray-200 text-gray-600 cursor-not-allowed opacity-75 transition-all duration-300 font-medium"
            >
              Become a Lender - Coming Soon
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Backed by Industry Leaders in Web3 & DeFi</span>
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-gray-200" />

          {/* Mock Sign In (Development Only) */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleMockSignIn}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-300 font-medium"
            >
              <TestTubes className="w-5 h-5" />
              Development Testing Sign In
            </button>
            <span className="text-xs text-gray-400">For development and testing purposes only</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;