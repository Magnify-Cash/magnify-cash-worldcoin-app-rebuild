import { DollarSign, Wallet, CreditCard } from "lucide-react";

export const WalletCard = ({ 
  currency, 
  symbol, 
  balance 
}: { 
  currency: string; 
  symbol: string; 
  balance: string;
}) => {
  const getIcon = () => {
    switch (symbol.toLowerCase()) {
      case 'wld':
        return <Wallet className="w-6 h-6 text-primary" />;
      case 'usdc.e':
        return <DollarSign className="w-6 h-6 text-primary" />;
      default:
        return <CreditCard className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div className="glass-card p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <h3 className="text-lg font-medium">{currency}</h3>
            <p className="text-sm text-gray-500">{symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold">{balance}</p>
        </div>
      </div>
    </div>
  );
};