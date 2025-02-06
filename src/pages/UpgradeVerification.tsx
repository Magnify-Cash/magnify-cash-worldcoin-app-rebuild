import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMagnifyWorld } from "@/hooks/useMagnifyWorld";
import { Shield, FileCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";

const UpgradeVerification = () => {
  // hooks
  const navigate = useNavigate();
  const ls_wallet = localStorage.getItem("ls_wallet_address");
  const { data, isLoading, isError, refetch } = useMagnifyWorld(ls_wallet);

  // icon mapping
  const IconMapping = ({ type, className, ...otherProps }) => {
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
    return <IconComponent className={className} {...otherProps} />;
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
              Currently: {nftInfo.tier.verificationStatus.level} Verified
            </p>
          </motion.div>

          {/* Verification cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(data?.allTiers).map(([index, tier]) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + parseInt(index) * 0.1 }}
                className={`glass-card p-6 ${
                  tier.verificationStatus !== nftInfo.tier.verificationStatus
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
                  disabled={tier.verificationStatus === nftInfo.tier.verificationStatus}
                  onClick={() => {}}
                >
                  {tier.verificationStatus === nftInfo.tier.verificationStatus
                    ? "Already claimed"
                    : `Upgrade to ${tier.verificationStatus.level}`}
                </Button>
              </motion.div>
            ))}
          </div>

          <Dialog open={false} onOpenChange={() => {}}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Verification Upgrade</DialogTitle>
                <DialogDescription>
                  Are you sure you want to upgrade to verification? This will mint an NFT collateral to your
                  WorldChain wallet.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {}}>
                  Cancel
                </Button>
                <Button onClick={() => {}} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Confirm Upgrade"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
};

export default UpgradeVerification;
