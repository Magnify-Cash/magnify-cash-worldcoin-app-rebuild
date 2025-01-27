import { DollarSign, Wallet, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import type { WalletBalance } from "@/types/wallet";

interface WalletCardProps {
  currency: string;
  symbol: string;
  balance: string;
  isLoading?: boolean;
}

export const WalletCard = ({ 
  currency, 
  symbol, 
  balance,
  isLoading = false
}: WalletCardProps) => {
  const getIcon = () => {
    switch (symbol.toLowerCase()) {
      case 'wld':
        return <Wallet className="w-6 h-6 text-primary" />;
      case 'usdc.e':
        return <DollarSign className="w-6 h-6 text-secondary" />;
      default:
        return <CreditCard className="w-6 h-6 text-accent" />;
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div>
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-16 mt-1" />
            </div>
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 hover-lift"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{currency}</h3>
            <p className="text-sm text-muted-foreground">{symbol}</p>
          </div>
        </div>
        <motion.div 
          className="text-right"
          key={balance}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-xl font-bold text-gradient">{balance}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};