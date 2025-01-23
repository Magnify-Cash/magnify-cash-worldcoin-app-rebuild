import { Header } from "@/components/Header";
import { WalletCard } from "@/components/WalletCard";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header title="Wallet" showBack={false} />
      
      <div className="p-6">
        <div className="text-center mb-8">
          <span className="text-4xl">@</span>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          <WalletCard
            currency="Worldcoin"
            symbol="WLD"
            balance="18.844945894151138"
          />
          <WalletCard
            currency="Bridged USDC (world-chain-mainnet)"
            symbol="USDC.e"
            balance="0.365332"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  );
};

export default Wallet;