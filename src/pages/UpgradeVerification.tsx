import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMagnifyWorld } from "@/hooks/useMagnifyWorld";
import { Shield, FileCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";

const UpgradeVerification = () => {
  const navigate = useNavigate();
  const ls_wallet = localStorage.getItem("ls_wallet_address");
  const walletAddress = ls_wallet ? (`0x${ls_wallet.slice(2)}` as `0x${string}`) : undefined;
  const { data, isLoading, isError } = useMagnifyWorld(walletAddress as `0x${string}`);
  
  const IconMapping = ({ type, className, ...otherProps }: { type: string; className?: string; [key: string]: any }) => {
    let IconComponent;
    if (type === "Orb Scan") {
      IconComponent = Globe;
    } else if (type === "Passport") {
      IconComponent = FileCheck;
    } else if (type === "World ID") {
      IconComponent = Shield;
    } else {
      return null;
    }
    return IconComponent ? <IconComponent className={className} {...otherProps} /> : null;
  };

  // Loading & error states
  if (isLoading || !data) {
    return (
      <div className="min-h-screen">
        <Header title="Upgrade Verification" />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="min-h-screen">
        <Header title="Upgrade Verification" />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">Error fetching data.</div>
      </div>
    );
  }

  // state
  if (data) {
    const nftInfo = data?.nftInfo || { tokenId: null, tier: null };
    const currentVerificationStatus = nftInfo?.tier?.verificationStatus;

    if (!currentVerificationStatus) {
      return (
        <div className="min-h-screen">
          <Header title="Upgrade Verification" />
          <div className="flex justify-center items-center h-[calc(100vh-80px)]">
            No verification status available.
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <Header title="Upgrade Verification" />
        <div className="p-6 max-w-4xl mx-auto">
          {/* Verification header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gradient mb-2 text-center">Verification Level</h2>
            <p className="text-muted-foreground text-center capitalize">
              Currently: {currentVerificationStatus.level} Verified
            </p>
          </motion.div>

          {/* Verification cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.allTiers && Object.entries(data.allTiers).map(([index, tier]) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + parseInt(index) * 0.1 }}
                className={`glass-card p-6 ${
                  tier.verificationStatus !== currentVerificationStatus
                    ? "opacity-50"
                    : "hover:shadow-lg transition-shadow"
                }`}
              >
                <IconMapping
                  type={tier.verificationStatus.level}
                  className="w-12 h-12 mx-auto mb-4 text-primary"
                />
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {tier.verificationStatus.level} Verification
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  {tier.verificationStatus.description}
                </p>
                <div className="text-2xl font-bold text-center mb-4 text-primary">
                  {tier.verificationStatus.maxLoanAmount}
                </div>
                <Button
                  className="w-full"
                  variant="default"
                  disabled={tier.verificationStatus === currentVerificationStatus}
                  onClick={() => {}}
                >
                  {tier.verificationStatus === currentVerificationStatus
                    ? "Already claimed"
                    : `Upgrade to ${tier.verificationStatus.level}`}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default UpgradeVerification;