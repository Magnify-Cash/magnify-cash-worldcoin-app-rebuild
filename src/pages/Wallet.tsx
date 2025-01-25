import { Header } from "@/components/Header";
import { WalletCard } from "@/components/WalletCard";
import { TransactionList } from "@/components/TransactionList";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/use-wallet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Wallet = () => {
  const navigate = useNavigate();
  const { balances, transactions, isLoading, error } = useWallet();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Wallet" showBack={false} />
      
      <div className="p-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load wallet data. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center mb-8">
          <span className="text-4xl">@</span>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {isLoading ? (
            <>
              <WalletCard
                currency=""
                symbol=""
                balance=""
                isLoading={true}
              />
              <WalletCard
                currency=""
                symbol=""
                balance=""
                isLoading={true}
              />
            </>
          ) : (
            balances.map((balance) => (
              <WalletCard
                key={balance.id}
                currency={balance.currency}
                symbol={balance.symbol}
                balance={balance.balance}
              />
            ))
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate("/loan")}
            className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 text-center rounded-xl"
          >
            <span className="text-2xl mb-2 block">+</span>
            <span className="text-gray-600">Get a loan</span>
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 text-center rounded-xl"
          >
            <span className="text-2xl mb-2 block">📊</span>
            <span className="text-gray-600">Dashboard</span>
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <TransactionList 
          transactions={transactions}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Wallet;