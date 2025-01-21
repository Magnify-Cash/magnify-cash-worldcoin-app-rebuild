import { DollarSign } from "lucide-react";

export const WalletCard = ({ 
  currency, 
  symbol, 
  balance 
}: { 
  currency: string; 
  symbol: string; 
  balance: string;
}) => {
  return (
    <div className="glass-card p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">{currency}</h3>
          <p className="text-sm text-gray-500">{symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold">{balance}</p>
        </div>
      </div>
    </div>
  );
};