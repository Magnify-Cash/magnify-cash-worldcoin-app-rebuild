import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { User, CreditCard, DollarSign, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header title="Dashboard" />
      
      <div className="p-6 max-w-2xl mx-auto">
        {/* User Info Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 mb-4"
          >
            <div className="flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gradient mb-2">@ty</h2>
            <p className="text-muted-foreground">Verified User</p>
          </motion.div>
        </div>

        {/* ID Vault Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            ID Vault
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">World ID</p>
                  <p className="text-sm text-muted-foreground">Verified Credential</p>
                </div>
              </div>
              <ShieldCheck className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </motion.div>

        {/* Loan Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
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
      </div>
    </div>
  );
};

export default Dashboard;