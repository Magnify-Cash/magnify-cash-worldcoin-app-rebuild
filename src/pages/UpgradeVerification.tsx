import { Header } from "@/components/Header";
import { Shield, FileCheck, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { checkVerificationEligibility, upgradeVerification, type VerificationLevel } from "@/services/verificationService";
import { VerificationTierCard } from "@/components/VerificationTier/VerificationTierCard";
import { VerificationHeader } from "@/components/VerificationTier/VerificationHeader";
import { MaxVerificationMessage } from "@/components/VerificationTier/MaxVerificationMessage";

const verificationLevels = ["device", "passport", "orb"] as const;

const UpgradeVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState({
    hasDeviceVerification: false,
    hasPassportVerification: false,
    hasOrbVerification: false
  });
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      const mockWorldId = "mock-world-id";
      const status = await checkVerificationEligibility(mockWorldId);
      setVerificationStatus(status);
    };

    fetchVerificationStatus();
  }, []);

  const tiers = [
    {
      type: "Device",
      icon: Shield,
      value: 1,
      available: true,
      description: "Basic verification with your device",
      requiresPassport: false,
      requiresOrb: false
    },
    {
      type: "Passport",
      icon: FileCheck,
      value: 5,
      available: true,
      description: "Enhanced verification with your passport",
      requiresPassport: true,
      requiresOrb: false
    },
    {
      type: "Orb",
      icon: Globe,
      value: 10,
      available: true,
      description: "Highest level of verification via World ID Orb",
      requiresPassport: false,
      requiresOrb: true
    },
  ];

  const isEligible = (tier: typeof tiers[0]): boolean => {
    if (tier.type === "Device") return true;
    if (tier.requiresPassport && !verificationStatus.hasPassportVerification) return false;
    if (tier.requiresOrb && !verificationStatus.hasOrbVerification) return false;
    return true;
  };

  const handleTierSelect = (tier: typeof tiers[0]) => {
    if (tier.type === "Orb") {
      window.open("https://worldcoin.org/download", "_blank");
      return;
    }

    if (!isEligible(tier)) {
      toast({
        title: "Verification Required",
        description: tier.requiresPassport 
          ? "You need a verified passport credential to upgrade to this tier."
          : "You need an Orb verification to upgrade to this tier.",
        variant: "destructive"
      });
      return;
    }

    setSelectedTier(tier.type);
    setIsDialogOpen(true);
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedTier) return;

    setIsLoading(true);
    const mockWorldId = "mock-world-id";
    const success = await upgradeVerification(
      mockWorldId,
      selectedTier.toLowerCase() as VerificationLevel
    );

    if (success) {
      toast({
        title: "Upgrade Successful",
        description: `Your verification has been upgraded to ${selectedTier} level.`
      });
      navigate("/profile");
    } else {
      toast({
        title: "Upgrade Failed",
        description: "There was an error upgrading your verification. Please try again.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
    setIsDialogOpen(false);
    setSelectedTier(null);
  };

  const getCurrentLevel = (): VerificationLevel => {
    if (verificationStatus.hasOrbVerification) return "orb";
    if (verificationStatus.hasPassportVerification) return "passport";
    return "device";
  };

  const verificationLevel = getCurrentLevel();
  const isMaxLevel = (level: VerificationLevel): boolean => level === "orb";

  return (
    <div className="min-h-screen bg-background">
      <Header title="Upgrade Verification" />
      <div className="p-6 max-w-4xl mx-auto">
        <VerificationHeader verificationLevel={verificationLevel} />

        {isMaxLevel(verificationLevel) ? (
          <MaxVerificationMessage />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <VerificationTierCard
                key={tier.type}
                {...tier}
                isEligible={isEligible(tier)}
                onSelect={() => handleTierSelect(tier)}
                index={index}
              />
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Verification Upgrade</DialogTitle>
              <DialogDescription>
                Are you sure you want to upgrade to {selectedTier} verification? 
                This will mint an NFT collateral to your WorldChain wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmUpgrade} disabled={isLoading}>
                {isLoading ? "Processing..." : "Confirm Upgrade"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UpgradeVerification;