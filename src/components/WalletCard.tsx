import { DollarSign, Wallet, CreditCard, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import type { WalletBalance } from "@/types/wallet";

interface WalletCardProps {
  currency: string;
  symbol: string;
  balance: string;
  isLoading?: boolean;
  type?: 'worldchain' | 'default';
}

export const WalletCard = ({ 
  currency, 
  symbol, 
  balance,
  isLoading = false,
  type = 'default'
}: WalletCardProps) => {
  const getIcon = () => {
    if (type === 'worldchain') {
      return <Globe className="w-6 h-6 text-blue-500" />;
    }
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
      className={`glass-card p-6 hover-lift ${type === 'worldchain' ? 'border-blue-500/20' : ''}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${
            type === 'worldchain' ? 'bg-blue-500/10 dark:bg-blue-500/20' : 'bg-primary/10 dark:bg-primary/20'
          }`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{currency}</h3>
            <p className="text-sm text-muted-foreground">
              {type === 'worldchain' ? 'WorldChain' : symbol}
            </p>
          </div>
        </div>
        <motion.div 
          className="text-right"
          key={balance}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className={`text-xl font-bold ${type === 'worldchain' ? 'text-blue-500' : 'text-gradient'}`}>
            {balance}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};