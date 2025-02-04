import { Shield } from "lucide-react";
import { motion } from "framer-motion";

interface VerificationHeaderProps {
  verificationLevel: string;
}

export const VerificationHeader = ({ verificationLevel }: VerificationHeaderProps) => {
  return (
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
  );
};