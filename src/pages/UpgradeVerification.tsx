import { useState } from "react";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMagnifyWorld, Tier } from "@/hooks/useMagnifyWorld";
import { Shield, FileCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { IDKitWidget, VerificationLevel, ISuccessResult } from "@worldcoin/idkit";

const UpgradeVerification = () => {
  // hooks
  const navigate = useNavigate();
  const ls_wallet = localStorage.getItem("ls_wallet_address");
  const { data, isLoading, isError, refetch } = useMagnifyWorld(ls_wallet);
  const [currentTier, setCurrentTier] = useState<Tier | null>(null);

  // icon mapping
  const IconMapping = ({ type, className, ...otherProps }) => {
    let IconComponent;
    if (type === "Orb Scan") {
      IconComponent = Globe;
    } else if (type === "Passport") {
      IconComponent = FileCheck;
    } else if (type === "Device") {
      IconComponent = Shield;
    } else {
      return null;
    }
    return <IconComponent className={className} {...otherProps} />;
  };

  // nft verification
  // - handle claim of verified nft
  const handleClaimNFT = async (proof: ISuccessResult, action: string) => {
    try {
      const res = await fetch("https://worldid-backend.kevin8396.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proof,
          signal: ls_wallet,
          action: action,
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Verification failed");
      }
      const data = await res.json();
      console.log("NFT minted successfully:", data);
      return data;
    } catch (error) {
      console.error("Verification error:", error);
      throw error;
    }
  };

  // - handle post-claim of verified NFT
  const handleSuccessfulClaim = () => {
    setCurrentTier(null);
    refetch();
    setTimeout(() => navigate("/loan"), 1000);
  };

  // Loading & error states
  if (isLoading || !data) {
    return (
      <div className="min-h-screen">
        <Header title="Verification Level" />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="min-h-screen">
        <Header title="Verification Level" />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">Error fetching data.</div>
      </div>
    );
  }

  // state
  if (data) {
    const nftInfo = data?.nftInfo || { tokenId: null, tier: null };
    return (
      <div className="min-h-screen bg-background">
        <Header title="Verification Level" />
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
          <IDKitWidget
            app_id="app_e1574897947a0a8633cd75b7c67125d7"
            action={currentTier?.verificationStatus.action}
            signal={ls_wallet}
            onSuccess={handleSuccessfulClaim}
            handleVerify={(proof) => handleClaimNFT(proof, currentTier?.verificationStatus.action)}
            verification_level={currentTier?.verificationStatus.verification_level as VerificationLevel}
          >
            {({ open }) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(data?.allTiers || {}).map(([index, tier]) => {
                  console.log(tier.verificationStatus.level);
                  // Check if the tier's verification level is not PASSPORT
                  if (tier.verificationStatus.level !== "Passport") {
                    return (
                      <motion.div
                        key={tier.tierId}
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
                        <Button
                          className="w-full"
                          variant="default"
                          disabled={tier.verificationStatus === nftInfo.tier.verificationStatus}
                          onClick={() => {
                            setCurrentTier(tier);
                            open();
                          }}
                        >
                          {nftInfo.tier.tierId > tier.tierId ||
                          tier.verificationStatus === nftInfo.tier.verificationStatus
                            ? "Already claimed"
                            : `Upgrade to ${tier.verificationStatus.level}`}
                        </Button>
                      </motion.div>
                    );
                  } else {
                    // If the tier is PASSPORT, return null to not render it
                    return null;
                  }
                })}
              </div>
            )}
          </IDKitWidget>
        </div>
      </div>
    );
  }
};

export default UpgradeVerification;
