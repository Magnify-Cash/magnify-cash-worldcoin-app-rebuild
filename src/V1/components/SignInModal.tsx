import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { toast } from "sonner";
import { MiniKit } from "@worldcoin/minikit-js";
import { Button } from "@/ui/button";
import { Wallet } from "lucide-react";

export interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

export const SignInModal = ({ isOpen, onClose, onSignIn }: SignInModalProps) => {
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
      } else {
        toast.error("Failed to retrieve wallet address.");
        onClose();
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Failed to sign in. Please try again.");
      onClose();
    }
  };

  // Watch for updates to MiniKit.user and handle username assignment
  useEffect(() => {
    const user = MiniKit.user;
    if (user) {
      setUsername(user.username);
      localStorage.setItem("ls_username", user.username);
    }
  }, [MiniKit.user]); // This will run whenever MiniKit.user is updated

  // UseEffect to trigger onSignIn once the sign-in conditions are met
  useEffect(() => {
    if (isSignInReady()) {
      onSignIn();
    }
  }, [walletAddress, username, onSignIn]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Magnify Cash</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <p className="text-center text-gray-600">
            This app will see your wallet and allow you to manage loans.
          </p>

          <div className="flex flex-col gap-2">
            {/* Sign In button */}
            <Button
              onClick={handleSignIn}
              variant="outline"
              className="flex-1 font-semibold shadow-sm transition-all duration-300 hover:animate-button-glow"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Sign In with Wallet
            </Button>
            {/* End Sign In button */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
