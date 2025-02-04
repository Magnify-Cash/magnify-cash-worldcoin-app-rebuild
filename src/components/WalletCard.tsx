import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import type { WalletBalance } from "@/types/wallet";
import { ArrowUpRight } from "lucide-react";

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
  const getTokenIcon = () => {
    switch (symbol.toLowerCase()) {
      case 'wld':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold">W</span>
          </div>
        );
      case 'usdc.e':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white">$</span>
          </div>
        );
      case 'wbtc':
        return (
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white">₿</span>
          </div>
        );
      case 'weth':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
            <span className="text-white">Ξ</span>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
            <span className="text-white">?</span>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-16 mt-1" />
          </div>
        </div>
        <Skeleton className="h-6 w-24" />
      </div>
    );
  }

  // Mock percentage changes for demo
  const getPercentageChange = () => {
    switch (symbol.toLowerCase()) {
      case 'wld':
        return '+10.13%';
      case 'usdc.e':
        return '+0.01%';
      case 'wbtc':
        return '+4.57%';
      case 'weth':
        return '+8.8%';
      default:
        return '+0%';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-4 hover:bg-accent/5 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-4">
        {getTokenIcon()}
        <div>
          <h3 className="font-medium text-foreground">{currency}</h3>
          <p className="text-sm text-muted-foreground">{symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{balance}</p>
        <p className="text-sm text-green-500">{getPercentageChange()}</p>
      </div>
    </motion.div>
  );
};