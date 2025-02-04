import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const LoanStatus = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
        <DollarSign className="w-8 h-8 text-primary" />
        Loan Status
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-6 bg-secondary/5 hover:bg-secondary/10 dark:bg-secondary/10 dark:hover:bg-secondary/20 rounded-xl transition-colors duration-300">
          <div className="space-y-1">
            <p className="text-xl font-semibold">Active Loan</p>
            <p className="text-muted-foreground">Collateralized by World ID</p>
          </div>
          <button 
            onClick={() => navigate("/loan")}
            className="glass-button transform hover:scale-105 transition-transform duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};