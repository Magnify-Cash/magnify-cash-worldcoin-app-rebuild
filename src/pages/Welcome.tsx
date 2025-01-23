import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Magnify Cash</div>
        <button 
          onClick={() => navigate("/wallet")}
          className="px-4 py-2 text-sm text-white bg-white/10 rounded-lg hover:bg-white/20 transition-all"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-transparent bg-clip-text">
            Unlock Your Digital Identity's Value
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Get instant loans backed by your World ID. No collateral needed, just your verified digital presence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate("/wallet")}
              className="glass-button flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => navigate("/guide")}
              className="glass-button flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20"
            >
              Become a Lender
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 text-gray-300">
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