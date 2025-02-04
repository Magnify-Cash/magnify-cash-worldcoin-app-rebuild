import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/f590c0ed-415e-4ed0-8f6b-631288f14028.png" 
            alt="Magnify Cash Logo" 
            className="w-8 h-8 rounded-[20%]"
          />
          <div className="text-gray-900 text-2xl font-medium">Magnify Cash</div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#2DFFF9] to-[#FF7777] text-transparent bg-clip-text animate-gradient">
            Unlock Your Digital Identity's Value
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto font-medium">
            Get instant loans backed by your World ID. No collateral needed, just your verified digital presence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate("/wallet")}
              className="glass-button flex items-center justify-center gap-2 bg-gradient-to-r from-[#2DFFF9] to-[#FF7777] hover:shadow-lg"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              disabled
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-gray-200 text-gray-600 cursor-not-allowed opacity-75 transition-all duration-300 font-medium"
            >
              Become a Lender - Coming Soon
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">
              Backed by Industry Leaders in Web3 & DeFi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;