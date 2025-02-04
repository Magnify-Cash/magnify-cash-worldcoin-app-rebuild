import { Header } from "@/components/Header";
import { Shield, FileCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const verificationLevels = ["device", "passport", "orb"] as const;
type VerificationLevel = (typeof verificationLevels)[number];

const UpgradeVerification = () => {
  const navigate = useNavigate();
  // Mock verification level - replace with actual user verification level later
  const verificationLevel: VerificationLevel = "device";

  const tiers = [
    {
      type: "Device",
      icon: Shield,
      value: 1,
      available: true,
      description: "Basic verification with your device",
    },
    {
      type: "Passport",
      icon: FileCheck,
      value: 5,
      available: false, // Coming soon
      description: "Enhanced verification with your passport",
    },
    {
      type: "Orb",
      icon: Globe,
      value: 10,
      available: true,
      description: "Highest level of verification via World ID Orb",
    },
  ];

  const isMaxLevel = (level: VerificationLevel): boolean => {
    return level === "orb";
  };

  const handleTierSelect = (tierType: string) => {
    if (tierType.toLowerCase() === "orb") {
      window.open("https://worldcoin.org/download", "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Upgrade Verification" />
      <div className="p-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gradient mb-2 text-center">
            Verification Level
          </h2>
          <p className="text-muted-foreground text-center capitalize">
            Currently: {verificationLevel} Verified
          </p>
        </motion.div>

        {isMaxLevel(verificationLevel) ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 text-center"
          >
            <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">
              Maximum Verification Achieved!
            </h3>
            <p className="text-muted-foreground">
              You are already Orb Verified and have access to our highest available loans!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`glass-card p-6 ${
                  !tier.available ? 'opacity-50' : 'hover:shadow-lg transition-shadow'
                }`}
              >
                <tier.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {tier.type} Verification
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  {tier.description}
                </p>
                <div className="text-2xl font-bold text-center mb-4 text-primary">
                  ${tier.value}
                </div>
                <Button
                  className="w-full"
                  variant={tier.available ? "default" : "secondary"}
                  disabled={!tier.available}
                  onClick={() => handleTierSelect(tier.type)}
                >
                  {!tier.available 
                    ? "Coming Soon" 
                    : tier.type === "Orb" 
                      ? "Get World ID" 
                      : `Upgrade to ${tier.type}`}
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpgradeVerification;