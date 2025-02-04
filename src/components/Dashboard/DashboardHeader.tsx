import { User } from "lucide-react";
import { motion } from "framer-motion";

export const DashboardHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-center mb-6">
        <User className="w-16 h-16 text-primary" />
      </div>
      <h2 className="text-3xl font-bold text-gradient mb-3 text-center">@Tytan</h2>
      <p className="text-muted-foreground text-center text-lg">Verified User</p>
    </motion.div>
  );
};