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
        return <Wallet className="w-6 h-6 text-blue-500" />;
      case 'usdc.e':
        return <DollarSign className="w-6 h-6 text-green-500" />;
      default:
        return <CreditCard className="w-6 h-6 text-purple-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded-full" />
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
      className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl p-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{currency}</h3>
            <p className="text-sm text-gray-500">{symbol}</p>
          </div>
        </div>
        <motion.div 
          className="text-right"
          key={balance}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-xl font-medium text-gray-900">{balance}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};