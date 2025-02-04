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

  // Mock WorldChain wallet data - this would come from your WorldChain integration
  const worldchainBalances = [
    {
      currency: "World ID Token",
      symbol: "WID",
      balance: "1,000",
      type: "worldchain"
    },
    {
      currency: "Verification NFT",
      symbol: "vNFT",
      balance: "2",
      type: "worldchain"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header title="Wallet" showBack={false} />
      
      <div className="p-6 max-w-2xl mx-auto">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load wallet data. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center mb-8">
          <span className="text-4xl text-gradient">@</span>
        </div>

        {/* WorldChain Wallet Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            WorldChain Wallet
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {worldchainBalances.map((balance, index) => (
              <WalletCard
                key={index}
                currency={balance.currency}
                symbol={balance.symbol}
                balance={balance.balance}
                type="worldchain"
              />
            ))}
          </div>
        </div>

        {/* Regular Wallet Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Main Wallet
          </h2>
          <div className="grid grid-cols-1 gap-4">
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
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate("/loan")}
            className="glass-card p-6 text-center hover-lift"
          >
            <span className="text-2xl mb-2 block text-primary">+</span>
            <span className="text-muted-foreground">Get a loan</span>
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="glass-card p-6 text-center hover-lift"
          >
            <span className="text-2xl mb-2 block text-secondary">📊</span>
            <span className="text-muted-foreground">Dashboard</span>
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-foreground">Recent Transactions</h2>
        <TransactionList 
          transactions={transactions}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Wallet;