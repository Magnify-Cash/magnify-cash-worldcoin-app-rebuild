import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { LoanCard } from "@/components/LoanCard";

const idCollaterals = [
  {
    title: "World ID",
    amount: "$1",
    interest: "2% APR",
    duration: "30 days",
    icon: "world" as const
  },
  {
    title: "Passport Credential",
    amount: "$5",
    interest: "2% APR",
    duration: "30 days",
    icon: "passport" as const
  },
  {
    title: "Orb Scan",
    amount: "$10",
    interest: "2% APR",
    duration: "30 days",
    icon: "orb" as const
  }
];

export const CollateralSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        Available ID Collaterals
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {idCollaterals.map((collateral, index) => (
          <motion.div
            key={collateral.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <LoanCard {...collateral} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};