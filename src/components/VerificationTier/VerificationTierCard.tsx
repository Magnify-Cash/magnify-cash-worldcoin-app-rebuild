import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface VerificationTierCardProps {
  icon: LucideIcon;
  type: string;
  description: string;
  value: number;
  available: boolean;
  isEligible: boolean;
  onSelect: () => void;
  index: number;
}

export const VerificationTierCard = ({
  icon: Icon,
  type,
  description,
  value,
  available,
  isEligible,
  onSelect,
  index,
}: VerificationTierCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      className={`glass-card p-6 ${
        !available ? 'opacity-50' : 'hover:shadow-lg transition-shadow'
      }`}
    >
      <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
      <h3 className="text-xl font-semibold mb-2 text-center">
        {type} Verification
      </h3>
      <p className="text-muted-foreground text-center mb-4">
        {description}
      </p>
      <div className="text-2xl font-bold text-center mb-4 text-primary">
        ${value}
      </div>
      <Button
        className="w-full"
        variant={isEligible ? "default" : "secondary"}
        disabled={!available || !isEligible}
        onClick={onSelect}
      >
        {type === "Orb" ? "Get World ID" : `Upgrade to ${type}`}
      </Button>
    </motion.div>
  );
};