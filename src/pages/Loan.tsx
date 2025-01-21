import { Header } from "@/components/Header";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Loan = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header title="Get a Loan" />
      
      <div className="p-6">
        <div className="glass-card p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Current Loan Eligibility</h2>
          
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-2" />
            <span>Device-Verified with World ID</span>
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">Loan Amount: $1</p>
            <p className="text-gray-600">Interest Rate: 2%</p>
            <p className="text-gray-600">Duration: 30 days</p>
          </div>
        </div>

        <button 
          onClick={() => navigate("/dashboard")}
          className="glass-button w-full"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Loan;