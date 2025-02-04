import { Globe } from "lucide-react";
import { motion } from "framer-motion";

export const MaxVerificationMessage = () => {
  return (
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
  );
};