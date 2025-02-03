import { Header } from "@/components/Header";
import { Shield, FileCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const verificationLevels = ["device", "passport", "orb"] as const;
type VerificationLevel = (typeof verificationLevels)[number];

const UpgradeVerification = () => {
  const navigate = useNavigate();
  // Mock verification level - replace with actual user verification level later
  const verificationLevel: VerificationLevel = "device";

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

        {verificationLevel === "orb" ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 opacity-50 cursor-not-allowed"
            >
              <FileCheck className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-xl font-semibold mb-2 text-center">
                Passport Verification
              </h3>
              <p className="text-muted-foreground text-center">Coming Soon</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 hover-lift cursor-pointer"
              onClick={() => window.open("https://worldcoin.org/download", "_blank")}
            >
              <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2 text-center">
                Orb Verification
              </h3>
              <p className="text-muted-foreground text-center">
                Visit a World ID Orb to upgrade your verification level
              </p>
              <button className="glass-button w-full mt-4">
                Find Nearest Orb
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpgradeVerification;