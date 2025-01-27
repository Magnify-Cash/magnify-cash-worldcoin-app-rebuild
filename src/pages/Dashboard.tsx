import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { User, DollarSign, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { LoanCard } from "@/components/LoanCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const idCollaterals = [
    {
      title: "World ID",
      amount: "$10",
      interest: "2% APR",
      duration: "30 days",
      icon: "world" as const
    },
    {
      title: "Passport Credential",
      amount: "$2,000",
      interest: "7% APR",
      duration: "6 months",
      icon: "passport" as const
    },
    {
      title: "Orb Scan",
      amount: "$10,000",
      interest: "4.5% APR",
      duration: "24 months",
      icon: "orb" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header title="Dashboard" />
      
      <div className="p-6 max-w-4xl mx-auto">
        {/* User Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gradient mb-2 text-center">@Tytan</h2>
          <p className="text-muted-foreground text-center">Verified User</p>
        </motion.div>

        {/* Loan Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary" />
            Loan Status
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/10 dark:bg-secondary/20 rounded-lg">
              <div>
                <p className="font-semibold">Active Loan</p>
                <p className="text-sm text-muted-foreground">Collateralized by World ID</p>
              </div>
              <button 
                onClick={() => navigate("/loan")}
                className="glass-button"
              >
                View Details
              </button>
            </div>
          </div>
        </motion.div>

        {/* ID Vault Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Available ID Collaterals
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {idCollaterals.map((collateral, index) => (
              <motion.div
                key={collateral.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <LoanCard {...collateral} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;