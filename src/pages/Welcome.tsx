import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="text-gray-900 text-2xl font-medium">Magnify Cash</div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-medium mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
            Unlock Your Digital Identity's Value
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
            Get instant loans backed by your World ID. No collateral needed, just your verified digital presence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate("/wallet")}
              className="glass-button flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => navigate("/guide")}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-all duration-300"
            >
              Become a Lender
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Shield className="w-5 h-5" />
            <span className="text-sm">
              Backed by Industry Leaders in Web3 & DeFi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;