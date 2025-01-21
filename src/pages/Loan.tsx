import { Header } from "@/components/Header";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLoanEligibility } from "@/services/loanService";
import { useToast } from "@/components/ui/use-toast";
import { Terminal } from "@/components/Terminal";

const Loan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['loanEligibility'],
    queryFn: fetchLoanEligibility,
  });

  const handleApply = () => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify loan eligibility. Please try again.",
      });
      return;
    }
    
    console.log("Applying for loan...");
    navigate("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header title="Get a Loan" />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header title="Get a Loan" />
      
      <div className="p-6 space-y-6">
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4">Current Loan Eligibility</h2>
          
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-2" />
            <span>Device-Verified with World ID</span>
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">Loan Amount: {data?.amount || "$0"}</p>
            <p className="text-gray-600">Interest Rate: {data?.interest || "0%"}</p>
            <p className="text-gray-600">Duration: {data?.duration || "N/A"}</p>
          </div>
        </div>

        <Terminal />

        <button 
          onClick={handleApply}
          className="glass-button w-full"
          disabled={isLoading || !!error}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Loan;