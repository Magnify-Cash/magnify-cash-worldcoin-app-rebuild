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
        return <Wallet className="w-6 h-6 text-blue-500" />;
      case 'usdc.e':
        return <DollarSign className="w-6 h-6 text-green-500" />;
      default:
        return <CreditCard className="w-6 h-6 text-purple-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{currency}</h3>
            <p className="text-sm text-gray-500">{symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-medium text-gray-900">{balance}</p>
        </div>
      </div>
    </div>
  );
};